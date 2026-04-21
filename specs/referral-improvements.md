# Spec: Referral System Improvements

## 1. Fix referral tracking for Google OAuth signups

**File:** `lib/auth.ts` — `signIn` callback

When a new Google user is created, check for a `ref` cookie or query param. The referral code needs to be passed through the OAuth flow.

**How:** In the login page (`app/(auth)/login/page.tsx`) and signup page, when `?ref=CODE` is in the URL, store it in a cookie before redirecting to Google OAuth:
```ts
// Before calling signIn("google", ...)
if (ref) document.cookie = `smooqi_ref=${ref}; path=/; max-age=600`
```

Then in `lib/auth.ts` `signIn` callback for Google, read `smooqi_ref` from the request cookies and apply the referral logic (same as email signup: grant new user 7-day trial, grant referrer their reward).

---

## 2. Change referral reward — XP boost instead of trial extension

**Problem:** 7-day trial extension per referral can be chained indefinitely by creating fake accounts.

**New reward model:**
- **Referrer:** +500 XP per successful referral (credited immediately when referred user completes signup)
- **New user (referee):** Keep the 7-day trial — this is fine, it's one-time per new account
- **Remove:** The trial extension for the referrer entirely

**Files to change:**
- `app/api/signup/route.ts` — replace the `prisma.user.update` trial extension with an XP grant:
```ts
await prisma.user.update({
  where: { id: referrer.id },
  data: { xp: { increment: 500 } },
})
```
- Also call the XP level-up logic if it exists (check `lib/xp.ts` for level calculation — update `level` field if XP threshold crossed)

---

## 3. Referral achievements

Add to the achievements seed in `prisma/seed.ts`:
```ts
{ sortOrder: 30, slug: 'first-referral', name: 'Connector', description: 'Invite your first friend', category: 'social', tier: 'bronze', icon: '🤝', requirement: { type: 'referrals', value: 1 } },
{ sortOrder: 31, slug: 'super-referrer', name: 'Advocate', description: 'Invite 5 friends', category: 'social', tier: 'silver', icon: '📣', requirement: { type: 'referrals', value: 5 } },
{ sortOrder: 32, slug: 'ambassador', name: 'Ambassador', description: 'Invite 10 friends', category: 'social', tier: 'gold', icon: '🌟', requirement: { type: 'referrals', value: 10 } },
```

Then in `app/api/signup/route.ts`, after granting XP to the referrer, check and unlock any referral achievements:
```ts
const referralCount = await prisma.user.count({ where: { referredById: referrer.id } })
const thresholds = [
  { count: 1, slug: 'first-referral' },
  { count: 5, slug: 'super-referrer' },
  { count: 10, slug: 'ambassador' },
]
for (const t of thresholds) {
  if (referralCount >= t.count) {
    const ach = await prisma.achievement.findUnique({ where: { slug: t.slug } })
    if (ach) {
      await prisma.userAchievement.upsert({
        where: { userId_achievementId: { userId: referrer.id, achievementId: ach.id } },
        create: { userId: referrer.id, achievementId: ach.id },
        update: {},
      })
    }
  }
}
```

---

## 4. In-app notification when someone uses your referral link

**File:** `app/api/signup/route.ts`

After granting XP to the referrer, create a notification record. Check the schema for how notifications work — look for a `Notification` model or how `NotificationItem` is built in `app/(app)/layout.tsx`. 

If there's no `Notification` DB model (notifications appear to be built dynamically from user stats), add a `ReferralNotification` approach: store a count in the user record (`referralRewardCount Int @default(0)`) and increment it. Then in `app/(app)/layout.tsx` where notifications are built, add:

```ts
if (user.referralRewardCount > 0) {
  notifications.push({
    id: 'referral',
    icon: '🤝',
    text: user.referralRewardCount === 1
      ? 'A friend joined using your referral link! +500 XP'
      : `${user.referralRewardCount} friends joined using your link! +${user.referralRewardCount * 500} XP`,
    timeAgo: 'Recent',
  })
}
```

**Schema change needed** — add to `User` model in `prisma/schema.prisma`:
```prisma
referralRewardCount Int @default(0)
```

Run `prisma db push` in the build command (already set) so it applies automatically on deploy.

Reset `referralRewardCount` to 0 after the user views the notifications — add a `POST /api/user/notifications/clear-referral` endpoint, call it when the notification drawer opens.

---

## 5. Fix "Rewards Earned" counter — count used links not paid upgrades

**File:** `app/(app)/invite/page.tsx`

Change:
```ts
const rewardedCount = await prisma.user.count({
  where: {
    referredById: session.user.id,
    subscriptionStatus: { not: 'free' },
  },
})
```

To:
```ts
const rewardedCount = await prisma.user.count({
  where: { referredById: session.user.id },
})
```

Also update the label from "Rewards Earned" to "Links Used" in the stats card.

---

## 6. Update invite page to show XP reward

Change the step 3 card text from "Both Get Premium" to "You Get 500 XP" and update description to "You earn 500 XP, they get a free trial".

---

## Constraints
- No changes to middleware, `lib/auth.ts` session/jwt callbacks (only `signIn` callback)
- Schema changes only via `prisma db push` (no new migration files needed)
- TypeScript must compile clean
- All referral logic must be wrapped in try/catch — never block signup if referral processing fails

## Verification
- Email signup with `?ref=CODE` → referrer gets +500 XP, new user gets trial
- Google OAuth signup with `?ref=CODE` (via cookie) → same rewards
- Referral achievements unlock at 1, 5, 10 referrals
- Notification appears in drawer after someone uses your link
- Invite page shows "Links Used" count (total signups via link, not paid upgrades)
- No way to chain trial extensions by creating fake accounts
