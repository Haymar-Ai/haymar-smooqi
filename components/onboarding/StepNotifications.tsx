'use client'

import { Button } from '@/components/ui/button'
import { themeConfig } from '@/lib/theme'

interface StepNotificationsProps {
  onEnable: () => void
  onSkip: () => void
  isSubmitting: boolean
  onBack: () => void
}

export function StepNotifications({
  onEnable,
  onSkip,
  isSubmitting,
  onBack,
}: StepNotificationsProps) {
  async function handleEnable() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        onEnable()
        return
      }
    }
    // If permission denied or unavailable, still proceed but mark as not enabled
    onSkip()
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight"
          style={themeConfig.isVB ? { fontFamily: 'var(--font-playfair)', color: '#1C1917' } : undefined}
        >
          Stay on track
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enable daily reminders to build your learning habit
        </p>
      </div>

      <div className="my-4 text-7xl">
        <span role="img" aria-label="Bell">
          🔔
        </span>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button
          onClick={handleEnable}
          disabled={isSubmitting}
          className="h-12 w-full rounded-[var(--button-radius,0.5rem)] bg-[var(--color-primary)] text-base font-semibold text-white hover:bg-[var(--color-primary)]/90 disabled:opacity-60"
        >
          {isSubmitting ? 'Setting up...' : 'Enable Reminders'}
        </Button>

        <button
          onClick={onSkip}
          disabled={isSubmitting}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-60"
        >
          Not Now
        </button>

        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-60"
        >
          Back
        </button>
      </div>
    </div>
  )
}
