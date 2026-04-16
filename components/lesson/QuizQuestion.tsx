'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type QuizQuestionProps = {
  question: {
    question: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    correctAnswer: string
    explanation?: string | null
  }
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

const OPTION_KEYS = ['A', 'B', 'C', 'D'] as const

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const options: Record<string, string> = {
    A: question.optionA,
    B: question.optionB,
    C: question.optionC,
    D: question.optionD,
  }

  const isCorrect = selected === question.correctAnswer

  const handleSelect = (key: string) => {
    if (showFeedback) return
    setSelected(key)
    setShowFeedback(true)
  }

  const handleNext = () => {
    onAnswer(isCorrect)
  }

  const getOptionStyles = (key: string) => {
    if (!showFeedback) {
      return 'bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
    }

    if (key === question.correctAnswer) {
      return 'bg-[#DCFCE7] border-2 border-green-400'
    }

    if (key === selected && !isCorrect) {
      return 'bg-[#FEE2E2] border-2 border-red-400'
    }

    return 'bg-white border border-gray-200 opacity-60'
  }

  return (
    <div className="max-w-[680px] mx-auto bg-white/85 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-gray-500 mb-2">
        Question {questionNumber} of {totalQuestions}
      </p>

      <p className="font-bold text-gray-900 mb-6" style={{ fontSize: '18px' }}>
        {question.question}
      </p>

      <div className="space-y-3">
        {OPTION_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            disabled={showFeedback}
            className={cn(
              'w-full text-left p-4 rounded-xl transition-all flex items-center gap-3',
              getOptionStyles(key)
            )}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
              {key}
            </span>
            <span className="flex-1 text-gray-800">{options[key]}</span>
            {showFeedback && key === question.correctAnswer && (
              <span className="text-lg">&#x2705;</span>
            )}
            {showFeedback && key === selected && !isCorrect && key !== question.correctAnswer && (
              <span className="text-lg">&#x274C;</span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showFeedback && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 bg-blue-50 rounded-xl text-sm text-gray-700">
              <span className="font-semibold">Explanation: </span>
              {question.explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFeedback && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleNext}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
              borderRadius: 'var(--button-radius)',
            }}
          >
            {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  )
}
