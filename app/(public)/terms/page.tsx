import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Smooqi',
  description: 'Smooqi terms of service — subscriptions, billing, acceptable use, and your rights.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">Last updated: May 2026</p>

      <div className="prose prose-sm mt-8 max-w-none text-gray-700">

        <h2 className="mt-8 text-lg font-semibold text-gray-900">1. The service</h2>
        <p>
          Smooqi is an educational app operated by Haymar Business Solutions, LLC, Los Angeles, California. It delivers short lessons, quizzes, and word games across 195+ topics. We aim for accuracy but Smooqi is not a substitute for professional advice in any field (medical, legal, financial, or otherwise).
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">2. Eligibility</h2>
        <p>
          You must be at least 13 years old to create a Smooqi account. By creating an account, you represent that you meet this age requirement. If you are between 13 and 18, you represent that a parent or guardian has reviewed and agreed to these terms on your behalf. We do not knowingly allow children under 13 to use Smooqi.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">3. Your account</h2>
        <p>
          You need a valid email address to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. One person per account — sharing accounts is not permitted.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">4. Free trial</h2>
        <p>
          New accounts receive a 7-day free trial with full access to all premium features. No credit card is required to start a trial. After 7 days, access to premium content requires an active paid subscription. Your learning progress, streaks, and achievements are preserved if you subscribe after your trial ends.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">5. Subscriptions and billing</h2>
        <p>
          Smooqi Premium is available on a monthly ($9.99/month) or annual ($59.99/year) basis, billed through Stripe. <strong>Subscriptions renew automatically</strong> at the end of each billing period until you cancel. By subscribing, you authorize us to charge your payment method on a recurring basis.
        </p>
        <p className="mt-3">
          You may cancel your subscription at any time from Settings → Subscription. Cancellation takes effect at the end of your current paid period — you retain access until then. We do not offer prorated refunds for partial billing periods, except where required by applicable law.
        </p>
        <p className="mt-3">
          If a payment fails, we will notify you by email and your account may be downgraded to free access until payment is resolved.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">6. Acceptable use</h2>
        <p>
          You agree not to: attempt to circumvent or reverse-engineer any part of the service; scrape, copy, or redistribute our content without permission; create multiple accounts to abuse trials or referral rewards; use Smooqi for any unlawful purpose; or interfere with other users&apos; access to the service. Violations may result in immediate account termination.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">7. Intellectual property</h2>
        <p>
          All course content, lesson text, quizzes, illustrations, and software on Smooqi are owned by Haymar Business Solutions, LLC or its licensors. You may access this content for personal, non-commercial use only. Nothing in these terms grants you any license to redistribute or sublicense our content.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">8. Account deletion</h2>
        <p>
          You can request account deletion at any time by emailing{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>.
          We will remove your personal data within 30 days. Active subscriptions should be cancelled before deletion to avoid further charges.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">9. Limitation of liability</h2>
        <p>
          The service is provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted by law, Haymar Business Solutions, LLC is not liable for indirect, incidental, or consequential damages arising from your use of Smooqi. Our total aggregate liability to you will not exceed the greater of (a) the amount you paid us in the 12 months preceding the claim, or (b) $50.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">10. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these terms will be resolved in the state or federal courts located in Los Angeles County, California, and you consent to the personal jurisdiction of those courts.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">11. Changes to these terms</h2>
        <p>
          We may update these terms as the product evolves. If we make material changes, we will update the date at the top of this page and notify active users by email at least 7 days before the changes take effect. Continued use of Smooqi after that date constitutes acceptance of the updated terms.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">12. Contact</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>.
        </p>

      </div>
    </div>
  )
}
