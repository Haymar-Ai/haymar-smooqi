import type { Metadata } from 'next'
import { PricingCards } from './PricingCards'

export const metadata: Metadata = {
  title: 'Pricing — Smooqi',
  description: 'Start your 7-day free trial. No credit card required. Then $9.99/month or $59.99/year.',
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Try free for 7 days. No credit card required.
        </p>
      </div>

      <PricingCards />
    </div>
  )
}
