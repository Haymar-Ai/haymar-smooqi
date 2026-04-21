'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { themeConfig } from '@/lib/theme'

interface Props {
  courseName: string
  lessonCount: number
  xpEarned: number
  onContinue: () => void
}

export function CourseComplete({ courseName, lessonCount, xpEarned, onContinue }: Props) {
  useEffect(() => {
    if (themeConfig.isVB) return
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
    })
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.5 },
      })
    }, 300)
    return () => clearTimeout(t)
  }, [])

  if (themeConfig.isVB) {
    return (
      <div
        className="flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: 'calc(100dvh - 80px)', paddingTop: '4rem' }}
      >
        <div className="relative mb-10">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative z-10"
            style={{ background: '#EAF4EF', border: '2px solid #C6DDD3' }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A6B4A"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <style>{`
            @keyframes vb-pulse-cc {
              0% { transform: scale(1); opacity: 0.4; }
              100% { transform: scale(1.8); opacity: 0; }
            }
            .vb-pulse-ring-cc {
              animation: vb-pulse-cc 1.5s ease-out forwards;
              animation-delay: var(--delay, 0s);
            }
          `}</style>
          <div
            className="vb-pulse-ring-cc absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#1A6B4A', ['--delay' as string]: '0s' } as React.CSSProperties}
          />
          <div
            className="vb-pulse-ring-cc absolute inset-0 rounded-full border-2"
            style={{ borderColor: '#1A6B4A', ['--delay' as string]: '0.3s' } as React.CSSProperties}
          />
        </div>

        <h2
          className="text-3xl font-bold mb-3"
          style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
        >
          Course complete.
        </h2>

        <p className="text-base mb-2" style={{ color: '#57534E' }}>
          {courseName}
        </p>

        <p className="text-sm mb-1" style={{ color: '#A8A29E' }}>
          {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'} completed
        </p>

        <p className="text-sm mb-10" style={{ color: '#A8A29E' }}>
          +{xpEarned} XP
        </p>

        <button
          onClick={onContinue}
          className="vb-btn-press px-8 py-3 text-sm font-semibold transition-colors"
          style={{
            background: '#1A6B4A',
            color: '#FFFFFF',
            borderRadius: '8px',
          }}
        >
          Back to courses
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-120px)] px-6"
    >
      <motion.span
        className="text-7xl mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
      >
        🏆
      </motion.span>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Complete!</h2>

      <p className="text-gray-600 mb-6">{courseName}</p>

      <Badge
        className="text-lg px-4 py-1.5 mb-4"
        style={{
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          border: 'none',
        }}
      >
        +{xpEarned} XP
      </Badge>

      <p className="text-sm text-gray-500 mb-8">
        {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'} completed
      </p>

      <Button
        onClick={onContinue}
        className="px-8"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
          borderRadius: 'var(--button-radius)',
        }}
      >
        Back to Courses
      </Button>
    </motion.div>
  )
}
