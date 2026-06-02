import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  issueType: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { issueType, email, subject, description } = parsed.data

    await prisma.supportRequest.create({
      data: {
        userId: session?.user?.id ?? null,
        email,
        issueType,
        subject,
        description,
      },
    })

    try {
      // Internal notification — new support ticket
      await sendEmail({
        from: 'Smooqi <support@smooqi.com>',
        to: 'hello@haymar.ai',
        subject: `[Support] ${issueType}: ${subject}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
            <h2 style="margin-top: 0;">New Support Request</h2>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Type:</strong> ${issueType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br/>${description}</p>
          </div>
        `,
      }).catch((err: unknown) => console.error('[Support] Internal notification failed:', err))

      // Confirmation to user
      await sendEmail({
        from: 'Smooqi <support@smooqi.com>',
        to: email,
        subject: `We received your message: ${subject}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
            <p>Hi,</p>
            <p>Thanks for reaching out. We received your support request and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong><br/>${description}</p>
            <p>— The Smooqi Team</p>
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
      console.error('[Support] Confirmation email failed:', err)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
