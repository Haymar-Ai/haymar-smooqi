'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useXpCounter } from '@/hooks/useXpCounter'
import { themeConfig } from '@/lib/theme'

type LessonCompleteProps = {
  lessonTitle: string
  onTakeQuiz: () => void
}

export function LessonComplete({ lessonTitle, onTakeQuiz }: LessonCompleteProps) {
  const xp = useXpCounter(10)

  useEffect(() => {
    if (themeConfig.isVB) return // vB: no confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  // ── vB: quiet, elegant lesson-complete screen ──
  if (themeConfig.isVB) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] px-6 text-center">
        {/* Radial pulse — CSS only */}
        <div className="relative mb-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
            style={{ background: '#EAF4EF', border: '2px solid #C6DDD3' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A6B4A"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <style>{`
            @keyframes vb-pulse {
              0% { transform: scale(1); opacity: 0.4; }
              100% { transform: scale(1.8); opacity: 0; }
            }
            .vb-pulse-ring {
              animation: vb-pulse 1.5s ease-out forwards;
              animation-delay: var(--delay, 0s);
            }
          `}</style>
          <div
            className="vb-pulse-ring absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#1A6B4A', ['--delay' as string]: '0s' } as React.CSSProperties}
          />
          <div
            className="vb-pulse-ring absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#1A6B4A', ['--delay' as string]: '0.3s' } as React.CSSProperties}
          />
        </div>

        <h2
          className="text-3xl font-bold mb-3"
          style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
        >
          Well done.
        </h2>

        <p className="text-base mb-2" style={{ color: '#57534E' }}>
          {lessonTitle}
        </p>

        <p className="text-sm mb-10" style={{ color: '#A8A29E' }}>
          +10 XP added to your library
        </p>

        <button
          onClick={onTakeQuiz}
          className="px-8 py-3 text-sm font-semibold transition-colors"
          style={{
            background: '#1A6B4A',
            color: '#FFFFFF',
            borderRadius: '8px',
          }}
        >
          Take the quiz
        </button>

        <button
          onClick={onTakeQuiz}
          className="mt-3 text-sm transition-colors"
          style={{ color: '#A8A29E' }}
        >
          Skip for now
        </button>
      </div>
    )
  }

  // ── vA: existing confetti + spring animation — unchanged ──
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] px-6"
    >
      <span className="text-6xl mb-4">🎉</span>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Complete!</h2>

      <p className="text-gray-600 mb-6">{lessonTitle}</p>

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

      <Button
        onClick={onTakeQuiz}
        className="px-8"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
          borderRadius: 'var(--button-radius)',
        }}
      >
        Take Quiz
      </Button>
    </motion.div>
  )
}
