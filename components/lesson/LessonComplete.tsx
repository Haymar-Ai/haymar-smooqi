'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useXpCounter } from '@/hooks/useXpCounter'

type LessonCompleteProps = {
  lessonTitle: string
  onTakeQuiz: () => void
}

export function LessonComplete({ lessonTitle, onTakeQuiz }: LessonCompleteProps) {
  const xp = useXpCounter(10)

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center text-center py-12 px-6"
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
