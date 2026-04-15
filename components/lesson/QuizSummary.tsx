'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useXpCounter } from '@/hooks/useXpCounter'

type QuizSummaryProps = {
  score: number
  totalQuestions: number
  onNextLesson: () => void
  onBackToCourse: () => void
  onTryAgain: () => void
  hasNextLesson: boolean
}

export function QuizSummary({
  score,
  totalQuestions,
  onNextLesson,
  onBackToCourse,
  onTryAgain,
  hasNextLesson,
}: QuizSummaryProps) {
  const passed = score >= 2
  const xp = useXpCounter(passed ? 15 : 0)

  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      })
    }
  }, [passed])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center text-center py-12 px-6"
    >
      <p className="text-5xl font-bold text-gray-900 mb-2">
        {score} / {totalQuestions}
      </p>

      <p className="text-lg text-gray-600 mb-4">
        {passed ? 'Nice work! 🎯' : 'Almost there'}
      </p>

      {passed && (
        <Badge
          className="text-lg px-4 py-1.5 mb-8"
          style={{
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            border: 'none',
          }}
        >
          +{xp} XP
        </Badge>
      )}

      {!passed && <div className="mb-8" />}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {passed ? (
          <>
            {hasNextLesson ? (
              <Button
                onClick={onNextLesson}
                className="w-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: 'var(--button-radius)',
                }}
              >
                Next Lesson &rarr;
              </Button>
            ) : (
              <Button
                onClick={onBackToCourse}
                className="w-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: 'var(--button-radius)',
                }}
              >
                Back to Course
              </Button>
            )}
            {hasNextLesson && (
              <Button variant="ghost" onClick={onBackToCourse} className="w-full">
                Back to Course
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              onClick={onTryAgain}
              className="w-full"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                borderRadius: 'var(--button-radius)',
              }}
            >
              Try Again
            </Button>
            <Button variant="ghost" onClick={onBackToCourse} className="w-full">
              Continue Anyway
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}
