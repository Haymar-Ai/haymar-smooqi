'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useXpCounter } from '@/hooks/useXpCounter'
import { themeConfig } from '@/lib/theme'

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
    if (themeConfig.isVB) return // vB: no confetti
    if (passed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      })
    }
  }, [passed])

  // ── vB: quiet summary ──
  if (themeConfig.isVB) {
    return (
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: 'calc(100dvh - 80px)', paddingTop: '4rem' }}
      >
        <p
          className="text-6xl font-bold mb-2"
          style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
        >
          {score}
          <span className="text-3xl" style={{ color: '#A8A29E' }}>
            /{totalQuestions}
          </span>
        </p>

        <p className="text-base mb-8" style={{ color: passed ? '#1A6B4A' : '#57534E' }}>
          {passed ? 'Excellent.' : 'Good effort.'}
        </p>

        {passed && (
          <p className="text-sm mb-8" style={{ color: '#A8A29E' }}>
            +15 XP added to your library
          </p>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {passed ? (
            <>
              {hasNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="w-full py-3 text-sm font-semibold"
                  style={{ background: '#1A6B4A', color: '#FFFFFF', borderRadius: '8px' }}
                >
                  Next lesson →
                </button>
              )}
              <button
                onClick={onBackToCourse}
                className="w-full py-3 text-sm"
                style={{ color: '#57534E' }}
              >
                Back to course
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onTryAgain}
                className="w-full py-3 text-sm font-semibold"
                style={{ background: '#1A6B4A', color: '#FFFFFF', borderRadius: '8px' }}
              >
                Try again
              </button>
              <button
                onClick={onBackToCourse}
                className="w-full py-3 text-sm"
                style={{ color: '#57534E' }}
              >
                Continue anyway
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── vA: existing confetti + spring — unchanged ──
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] px-6"
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
