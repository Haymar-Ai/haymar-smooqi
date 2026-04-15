import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
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

    // TODO: Send email via Resend
    console.log(`[Password Reset] URL for ${email}: ${resetUrl}`)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
