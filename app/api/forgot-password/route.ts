import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import { sendEmail } from "@/lib/email"
import { resetRateLimit } from "@/lib/rateLimit"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success: allowed } = await resetRateLimit.limit(ip)
    if (!allowed) {
      // Return success to prevent enumeration / probing
      return NextResponse.json({ success: true })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      // Return success regardless to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    const { email } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // Return success regardless to prevent email enumeration
      return NextResponse.json({ success: true })
    }

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({ where: { email } })

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`

    try {
      await sendEmail({
        from: 'Smooqi <noreply@smooqi.com>',
        to: email,
        subject: 'Reset your Smooqi password',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h1 style="color: #7C3AED; font-size: 24px; margin-bottom: 8px;">Reset your password</h1>
            <p style="color: #374151; margin-bottom: 24px;">
              Click the button below to reset your Smooqi password. This link expires in 1 hour.
            </p>
            <a href="${resetUrl}"
               style="display: inline-block; background: #7C3AED; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: 600;">
              Reset Password
            </a>
            <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
              If you didn't request this, you can safely ignore this email.
            </p>
            <div style="border-top: 1px solid #E5E7EB; margin-top: 40px; padding-top: 20px;">
              <p style="font-size: 12px; color: #9CA3AF; margin: 0; line-height: 1.6;">
                Smooqi — a product of Haymar Business Solutions, LLC<br>
                Los Angeles, California, USA<br>
                <a href="https://www.smooqi.com/privacy" style="color: #9CA3AF;">Privacy Policy</a> ·
                <a href="https://www.smooqi.com/terms" style="color: #9CA3AF;">Terms of Service</a>
              </p>
            </div>
          </div>
        `,
      })
    } catch (err) {
      console.error('[Forgot Password] Email send failed:', err)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
