import { prisma } from '@/lib/db'
import { redis } from '@/lib/redis'
import { grantPaidReferralReward } from '@/lib/referrals'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiVersion: '2024-12-18.acacia' as any,
  })
}

export async function POST(req: Request) {
  const stripe = getStripe()
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotency: skip already-processed events
  const eventId = event.id
  const existing = await redis.get(`stripe:event:${eventId}`)
  if (existing) {
    return NextResponse.json({ received: true, duplicate: true }, { status: 200 })
  }
  await redis.set(`stripe:event:${eventId}`, '1', { ex: 60 * 60 * 24 * 3 })

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const statusMap: Record<string, string> = {
          trialing: 'trialing',
          active: 'active',
          past_due: 'past_due',
          canceled: 'canceled',
          unpaid: 'unpaid',
          incomplete: 'incomplete',
          incomplete_expired: 'expired',
          paused: 'paused',
        }

        const subscriptionStatus = statusMap[subscription.status] ?? subscription.status

        await prisma.user.update({
          where: { stripeCustomerId: customerId },
          data: {
            subscriptionStatus,
            subscriptionPlan: subscription.items.data[0]?.price?.id ?? null,
            trialEndsAt: subscription.trial_end
              ? new Date(subscription.trial_end * 1000)
              : null,
            subscriptionEndsAt: subscription.items.data[0]?.current_period_end
              ? new Date(subscription.items.data[0].current_period_end * 1000)
              : null,
          },
        })

        // Reward referrer when referred user converts to paid monthly plan
        if (subscription.status === 'active') {
          const priceId = subscription.items.data[0]?.price?.id
          const isMonthly = priceId === process.env.STRIPE_MONTHLY_PRICE_ID
          if (isMonthly) {
            const user = await prisma.user.findUnique({
              where: { stripeCustomerId: customerId },
              select: { referredById: true },
            })
            if (user?.referredById) {
              await grantPaidReferralReward(user.referredById)
            }
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        await prisma.user.update({
          where: { stripeCustomerId: customerId },
          data: {
            subscriptionStatus: 'canceled',
            subscriptionPlan: null,
            subscriptionEndsAt: new Date(),
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        if (customerId) {
          await prisma.user.update({
            where: { stripeCustomerId: customerId },
            data: { subscriptionStatus: 'past_due' },
          })
        }
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
          select: { email: true, name: true, trialEndsAt: true },
        })

        if (user?.email) {
          const trialEnd = user.trialEndsAt
            ? new Date(user.trialEndsAt).toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric'
              })
            : 'in 3 days'

          try {
            await sendEmail({
              from: 'Smooqi <hello@smooqi.com>',
              to: user.email,
              subject: 'Your Smooqi trial ends soon — keep your streak alive',
              html: `
                <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 32px;">
                  <div style="margin-bottom: 32px;">
                    <span style="font-size: 28px; font-weight: 800; color: #111827;">Sm</span><span style="font-size: 28px; font-weight: 800; color: #7C3AED;">ooqi</span>
                  </div>
                  <h1 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 12px;">
                    Your free trial ends ${trialEnd}
                  </h1>
                  <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
                    Hi ${user.name ?? 'there'} — your Smooqi trial is ending in 3 days. Subscribe now to keep your streak, XP, achievements, and access to all 54 courses.
                  </p>
                  <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 32px;">
                    The annual plan is <strong>$59.99/year</strong> — that's less than $1.15/week for daily learning across 15 topics.
                  </p>
                  <a href="${process.env.NEXTAUTH_URL}/pricing?reason=trial_ending"
                     style="display: inline-block; background: #7C3AED; color: white; padding: 14px 28px; border-radius: 24px; text-decoration: none; font-weight: 600; font-size: 15px;">
                    Subscribe and Keep Learning →
                  </a>
                  <p style="font-size: 13px; color: #9CA3AF; margin-top: 40px;">
                    No action needed if you don't want to continue — your account will revert to free after your trial.
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
            console.error('[webhook] trial_will_end email failed:', err)
          }
        }
        break
      }

      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        if (checkoutSession.mode === 'subscription' && checkoutSession.customer) {
          const customerId = checkoutSession.customer as string
          const subscriptionId = checkoutSession.subscription as string | null

          if (subscriptionId) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId)
            const statusMap: Record<string, string> = {
              trialing: 'trialing',
              active: 'active',
            }
            const status = statusMap[subscription.status] ?? subscription.status
            await prisma.user.update({
              where: { stripeCustomerId: customerId },
              data: {
                subscriptionStatus: status,
                trialEndsAt: subscription.trial_end
                  ? new Date(subscription.trial_end * 1000)
                  : null,
              },
            })
          }
        }
        break
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
