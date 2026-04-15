'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { StepTopics } from './StepTopics'
import { StepDailyGoal } from './StepDailyGoal'
import { StepNotifications } from './StepNotifications'

type TopicItem = {
  id: string
  slug: string
  name: string
  icon: string
  colorHex: string
  _count: { courses: number }
}

interface OnboardingShellProps {
  topics: TopicItem[]
}

export function OnboardingShell({ topics }: OnboardingShellProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [dailyGoal, setDailyGoal] = useState(15)
  const [, setNotificationsEnabled] = useState(false)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function goToStep(step: number) {
    setDirection(step > currentStep ? 1 : -1)
    setCurrentStep(step)
  }

  function handleToggleTopic(topicId: string) {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : prev.length < 5
          ? [...prev, topicId]
          : prev
    )
  }

  async function handleComplete(enabled: boolean) {
    setNotificationsEnabled(enabled)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicIds: selectedTopics,
          dailyGoal,
          notificationsEnabled: enabled,
        }),
      })

      if (res.ok) {
        router.push('/home')
      }
    } catch {
      // Allow retry
    } finally {
      setIsSubmitting(false)
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8">
      {/* Header */}
      <div className="mx-auto flex w-full max-w-lg items-center justify-between">
        {/* Progress dots */}
        <div className="flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                step === currentStep
                  ? 'bg-[var(--color-primary)]'
                  : step < currentStep
                    ? 'bg-[var(--color-primary)]/60'
                    : 'bg-muted-foreground/30'
              )}
            />
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={() => router.push('/home')}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Step content */}
      <div className="mx-auto mt-8 w-full max-w-lg flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <StepTopics
                topics={topics}
                selectedTopics={selectedTopics}
                onToggle={handleToggleTopic}
                onContinue={() => goToStep(2)}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <StepDailyGoal
                dailyGoal={dailyGoal}
                onSelect={setDailyGoal}
                onContinue={() => goToStep(3)}
                onBack={() => goToStep(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <StepNotifications
                onEnable={() => handleComplete(true)}
                onSkip={() => handleComplete(false)}
                isSubmitting={isSubmitting}
                onBack={() => goToStep(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
