import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { apiRateLimit } from '@/lib/rateLimit'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  message: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { success } = await apiRateLimit.limit(`feedback:${session.user.id}`)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { rating, message } = parsed.data
    const userEmail = session.user.email ?? 'unknown'

    try {
      await sendEmail({
        from: 'Smooqi <support@smooqi.com>',
        to: 'hello@haymar.ai',
        subject: `App rating: ${rating}/5 from ${userEmail}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px;">
            <p><strong>Rating:</strong> ${rating} / 5</p>
            <p><strong>User:</strong> ${userEmail}</p>
            ${message ? `<p><strong>Message:</strong><br/>${message.replace(/</g, '&lt;')}</p>` : '<p><em>No message provided.</em></p>'}
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
      console.error('[Feedback] Email failed:', err)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
