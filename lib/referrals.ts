import { prisma } from './db'
import { getLevelFromXp } from './xp'

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
