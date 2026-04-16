'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { themeConfig } from '@/lib/theme'

const goalOptions = [
  { minutes: 5, label: '5 min', description: 'Quick daily habit' },
  { minutes: 10, label: '10 min', description: 'Solid learning block' },
  { minutes: 15, label: '15 min', description: 'Recommended' },
  { minutes: 20, label: '20 min', description: 'Deep dive' },
]

interface StepDailyGoalProps {
  dailyGoal: number
  onSelect: (minutes: number) => void
  onContinue: () => void
  onBack: () => void
}

export function StepDailyGoal({
  dailyGoal,
  onSelect,
  onContinue,
  onBack,
}: StepDailyGoalProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={themeConfig.isVB ? { fontFamily: 'var(--font-playfair)', color: '#1C1917' } : undefined}
        >
          How much time can you commit?
        </h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll customize your daily learning path
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {goalOptions.map((option) => {
          const isSelected = dailyGoal === option.minutes

          return (
            <button
              key={option.minutes}
              onClick={() => onSelect(option.minutes)}
              className={cn(
                'flex items-center gap-4 rounded-[var(--card-radius,0.75rem)] border-2 p-4 text-left transition-all',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                  : 'border-transparent bg-card ring-1 ring-foreground/10 hover:ring-foreground/20'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {option.minutes}
              </div>
              <div>
                <p className="font-semibold">{option.label}</p>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <Button
          onClick={onContinue}
          className="h-12 w-full rounded-[var(--button-radius,0.5rem)] bg-[var(--color-primary)] text-base font-semibold text-white hover:bg-[var(--color-primary)]/90"
        >
          Continue
        </Button>
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}
