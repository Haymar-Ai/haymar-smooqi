import Stripe from 'stripe'
import { prisma } from './db'
import { getLevelFromXp } from './xp'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' as any })
}

const REFERRAL_XP = 500

const REFERRAL_THRESHOLDS = [
  { count: 1, slug: 'first-referral' },
  { count: 5, slug: 'super-referrer' },
  { count: 10, slug: 'ambassador' },
]

/**
 * Grants referral rewards to the referrer: XP, level recalc,
 * referralRewardCount bump, and any unlocked referral achievements.
 * Swallows errors — referral failures must never block signup.
 */
export async function grantReferralReward(referrerId: string) {
  try {
    const updated = await prisma.user.update({
      where: { id: referrerId },
      data: {
        xp: { increment: REFERRAL_XP },
        referralRewardCount: { increment: 1 },
      },
      select: { xp: true, level: true },
    })

    const newLevel = getLevelFromXp(updated.xp)
    if (newLevel !== updated.level) {
      await prisma.user.update({
        where: { id: referrerId },
        data: { level: newLevel },
      })
    }

    const referralCount = await prisma.user.count({
      where: { referredById: referrerId },
    })

    for (const t of REFERRAL_THRESHOLDS) {
      if (referralCount >= t.count) {
        const ach = await prisma.achievement.findUnique({ where: { slug: t.slug } })
        if (ach) {
          await prisma.userAchievement.upsert({
            where: {
              userId_achievementId: { userId: referrerId, achievementId: ach.id },
            },
            create: { userId: referrerId, achievementId: ach.id },
            update: {},
          })
        }
      }
    }
  } catch (err) {
    console.error('[referrals] grantReferralReward failed:', err)
  }
}

/**
 * Called when a referred user converts to a paid monthly subscription.
 * Grants XP for every conversion. Grants a $9.99 Stripe balance credit
 * only once ever (first monthly conversion). Swallows errors.
 */
export async function grantPaidReferralReward(referrerId: string) {
  try {
    const referrer = await prisma.user.findUnique({
      where: { id: referrerId },
      select: { stripeCustomerId: true, referralFreeMonthGranted: true, xp: true, level: true },
    })
    if (!referrer) return

    // XP for every paid conversion
    const updated = await prisma.user.update({
      where: { id: referrerId },
      data: { xp: { increment: REFERRAL_XP } },
      select: { xp: true, level: true },
    })
    const newLevel = getLevelFromXp(updated.xp)
    if (newLevel !== updated.level) {
      await prisma.user.update({ where: { id: referrerId }, data: { level: newLevel } })
    }

    // Free month credit — only once, only for monthly plan conversions
    if (!referrer.referralFreeMonthGranted && referrer.stripeCustomerId) {
      const stripe = getStripe()
      await stripe.customers.createBalanceTransaction(referrer.stripeCustomerId, {
        amount: -999, // -$9.99 in cents
        currency: 'usd',
        description: 'Referral reward — 1 free month',
      })
      await prisma.user.update({
        where: { id: referrerId },
        data: { referralFreeMonthGranted: true },
      })
    }
  } catch (err) {
    console.error('[referrals] grantPaidReferralReward failed:', err)
  }
}
