import { prisma } from '@/lib/db'
import { generateReferralCode } from '@/lib/utils'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  ref: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = signupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, password, ref } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: { email: ['Email already registered'] } }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    let referredById: string | undefined
    if (ref) {
      const referrer = await prisma.user.findFirst({ where: { referralCode: ref } })
      if (referrer) {
        referredById = referrer.id
        // Grant 7 days premium trial to referrer
        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            subscriptionStatus: 'trialing',
            trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        })
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        referralCode: generateReferralCode(),
        referredById,
        ...(referredById ? {
          subscriptionStatus: 'trialing',
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        } : {}),
      },
    })

    return NextResponse.json({ id: user.id, email: user.email })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
