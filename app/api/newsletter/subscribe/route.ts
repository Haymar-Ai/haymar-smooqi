import { prisma } from '@/lib/db'
import { rateLimit } from '@/lib/rateLimit'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    const { allowed } = rateLimit(`newsletter:${ip}`, 3, 60 * 60 * 1000)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

    // Upsert to avoid duplicates
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { updatedAt: new Date() },
      create: { email: parsed.data.email },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
