import type { Metadata } from 'next'
import { PricingCards } from './PricingCards'

export const metadata: Metadata = {
  title: 'Pricing — Smooqi',
  description: 'Start your 7-day free trial. No credit card required. Then $9.99/month or $59.99/year.',
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>
}) {
  const params = await searchParams
  const reason = params.reason

  const isExpired = reason === 'trial_expired'
  const isEnding = reason === 'trial_ending'

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {isExpired && (
        <div className="mb-8 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-5 text-center">
          <p className="text-lg font-semibold text-amber-900">Your free trial has ended</p>
          <p className="mt-1 text-sm text-amber-700">
            You had full access to 54 courses across 15 topics. Subscribe now to pick up right where you left off — your progress is saved.
          </p>
        </div>
      )}
      {isEnding && (
        <div className="mb-8 rounded-2xl bg-blue-50 border border-blue-200 px-6 py-5 text-center">
          <p className="text-lg font-semibold text-blue-900">Your trial is ending soon</p>
          <p className="mt-1 text-sm text-blue-700">
            Subscribe before your trial ends to keep your streak, XP, and progress. Lock in the annual plan and save 50%.
          </p>
        </div>
      )}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {isExpired ? 'Continue Learning on Smooqi' : 'Simple, Transparent Pricing'}
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          {isExpired
            ? 'Your streak and progress are waiting. Subscribe to continue.'
            : 'Try free for 7 days. No credit card required.'}
        </p>
      </div>

      <PricingCards />
    </div>
  )
}
