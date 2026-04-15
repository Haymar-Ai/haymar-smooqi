export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Continue Learning</h2>
          <p className="mt-2 text-sm text-gray-500">
            Pick up where you left off with your lessons.
          </p>
          <p className="mt-4 text-xs text-[var(--color-primary)] font-medium">
            Coming in Phase 2
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Daily Challenge</h2>
          <p className="mt-2 text-sm text-gray-500">
            Complete today&apos;s challenge to earn bonus XP.
          </p>
          <p className="mt-4 text-xs text-[var(--color-primary)] font-medium">
            Coming in Phase 2
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Your Stats</h2>
          <p className="mt-2 text-sm text-gray-500">
            Track your progress and streaks.
          </p>
          <p className="mt-4 text-xs text-[var(--color-primary)] font-medium">
            Coming in Phase 2
          </p>
        </div>
      </div>
    </div>
  )
}
