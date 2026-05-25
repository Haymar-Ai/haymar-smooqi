import { prisma } from '@/lib/db'
import { generateReferralCode } from '@/lib/utils'
import { signupRateLimit } from '@/lib/rateLimit'
import { grantReferralReward } from '@/lib/referrals'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email').max(255, 'Email too long'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password too long'),
  ref: z.string().max(50).optional(),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success } = await signupRateLimit.limit(ip)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = signupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, password, ref } = parsed.data
    const normalizedEmail = email.toLowerCase()

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existing) {
      return NextResponse.json({ error: { email: ['Email already registered'] } }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    let referredById: string | undefined
    if (ref) {
      try {
        const referrer = await prisma.user.findFirst({ where: { referralCode: ref } })
        if (referrer) {
          referredById = referrer.id
        }
      } catch (err) {
        console.error('[signup] referrer lookup failed:', err)
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        passwordHash,
        referralCode: generateReferralCode(),
        referredById,
        subscriptionStatus: 'trialing',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    if (referredById) {
      await grantReferralReward(referredById)
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        // TODO: change to 'Smooqi <hello@smooqi.com>' once smooqi.com is verified in Resend
        from: 'Smooqi <hello@haymar.ai>',
        to: user.email,
        subject: 'Welcome to Smooqi 🧠',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 32px; background: #ffffff;">
            <div style="margin-bottom: 32px;">
              <span style="font-size: 28px; font-weight: 800; color: #111827;">Sm</span><span style="font-size: 28px; font-weight: 800; color: #7C3AED;">ooqi</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 12px;">Welcome, ${user.name ?? 'learner'}.</h1>
            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
              Your 7-day free trial has started. You have full access to all 54 courses across 15 topics — no credit card needed yet.
            </p>
            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 32px;">
              One lesson a day is all it takes. Pick a topic you've always been curious about and start today.
            </p>
            <a href="${process.env.NEXTAUTH_URL}/home"
               style="display: inline-block; background: #7C3AED; color: white; padding: 14px 28px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Start Learning →
            </a>
            <p style="font-size: 13px; color: #9CA3AF; margin-top: 40px; line-height: 1.5;">
              Your trial ends in 7 days. After that, continue for $9.99/month or $59.99/year.<br>
              Questions? Reply to this email or visit <a href="${process.env.NEXTAUTH_URL}/support" style="color: #7C3AED;">our support page</a>.
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
      console.error('[signup] Welcome email failed:', err)
    }

    return NextResponse.json({ id: user.id, email: user.email })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
