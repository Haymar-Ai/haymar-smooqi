import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Smooqi',
  description: 'How Smooqi collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">Last updated: May 2026</p>

      <div className="prose prose-sm mt-8 max-w-none text-gray-700">

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Who we are</h2>
        <p>
          Smooqi is operated by Haymar Business Solutions, LLC (&quot;Haymar,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), based in Los Angeles, California. You can reach us at{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Age requirement</h2>
        <p>
          Smooqi is intended for users who are 13 years of age or older. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child under 13 has created an account, please contact us at{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>{' '}
          and we will delete the account promptly.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">What we collect</h2>
        <ul className="list-disc pl-5">
          <li><strong>Account info:</strong> your email address, display name, and profile image if you sign in with Google.</li>
          <li><strong>Learning activity:</strong> lessons and quizzes completed, XP, streaks, topic preferences, and time spent — everything needed to run the app.</li>
          <li><strong>Device and usage data:</strong> browser type, IP address, and general location used for rate limiting and security.</li>
          <li><strong>Billing info:</strong> if you subscribe, Stripe stores your payment details. We never see or store your card number.</li>
          <li><strong>Communications:</strong> if you contact support or submit feedback, we retain that correspondence.</li>
        </ul>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">How we use it</h2>
        <p>
          We use your information to operate and improve Smooqi: render your dashboard, track learning progress, send transactional emails (account confirmation, password reset, subscription notices), and process payments. We do not sell personal data. We do not share it with advertisers or use it for behavioral ad targeting.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Cookies and local storage</h2>
        <p>
          We use strictly necessary cookies to keep you signed in (session token via NextAuth). We also use browser local storage to remember your theme preference. We do not use advertising cookies or third-party tracking pixels.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Third parties we rely on</h2>
        <ul className="list-disc pl-5">
          <li><strong>Google OAuth</strong> — optional sign-in. Governed by Google&apos;s privacy policy.</li>
          <li><strong>Stripe</strong> — payment processing and subscription management. Governed by Stripe&apos;s privacy policy.</li>
          <li><strong>Upstash</strong> — rate limiting (stores anonymized IP hashes, no personal data).</li>
          <li><strong>Resend</strong> — transactional email delivery.</li>
          <li><strong>Amazon Web Services</strong> — hosting and database infrastructure.</li>
        </ul>
        <p>Each processor receives only the data necessary for its specific function.</p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Data retention</h2>
        <p>
          We retain your account data for as long as your account is active. If you delete your account, we will remove your personal information within 30 days, except where retention is required by law (for example, Stripe retains billing records for up to 7 years for financial compliance). Anonymized usage data may be retained for product analytics.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Your rights</h2>
        <p>Depending on where you live, you may have the right to:</p>
        <ul className="list-disc pl-5">
          <li><strong>Access</strong> the personal information we hold about you.</li>
          <li><strong>Correct</strong> inaccurate personal information.</li>
          <li><strong>Delete</strong> your account and associated personal data.</li>
          <li><strong>Portability</strong> — receive a copy of your data in a machine-readable format.</li>
          <li><strong>Opt out</strong> of any future sale of your personal data (we do not currently sell data).</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>.
          We will respond within 30 days.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">California residents (CCPA)</h2>
        <p>
          If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete it, and the right to opt out of its sale. We do not sell personal information. To submit a CCPA request, email{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>{' '}
          with &quot;CCPA Request&quot; in the subject line.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Changes to this policy</h2>
        <p>
          If we make material changes, we will update the date at the top of this page and notify active users by email. Continued use of Smooqi after changes take effect constitutes acceptance.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-gray-900">Contact</h2>
        <p>
          Questions or requests? Email{' '}
          <a href="mailto:hello@haymar.ai" className="text-[var(--color-primary)] hover:underline">hello@haymar.ai</a>.
        </p>

      </div>
    </div>
  )
}
