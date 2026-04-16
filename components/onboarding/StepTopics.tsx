'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { themeConfig } from '@/lib/theme'

type TopicItem = {
  id: string
  slug: string
  name: string
  icon: string
  colorHex: string
  _count: { courses: number }
}

interface StepTopicsProps {
  topics: TopicItem[]
  selectedTopics: string[]
  onToggle: (topicId: string) => void
  onContinue: () => void
}

export function StepTopics({
  topics,
  selectedTopics,
  onToggle,
  onContinue,
}: StepTopicsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={themeConfig.isVB ? { fontFamily: 'var(--font-playfair)', color: '#1C1917' } : undefined}
        >
          What do you want to learn?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pick up to 5 topics you&apos;re most curious about
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic.id)
          const vbColors = themeConfig.isVB
            ? themeConfig.topicColors[topic.slug] ?? { bg: '#F5F0E8', text: '#57534E' }
            : null

          return (
            <button
              key={topic.id}
              onClick={() => onToggle(topic.id)}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-[var(--card-radius,0.75rem)] border-2 p-4 transition-all',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                  : 'border-transparent bg-card ring-1 ring-foreground/10 hover:ring-foreground/20'
              )}
              style={
                vbColors && !isSelected
                  ? { background: vbColors.bg, color: vbColors.text }
                  : undefined
              }
            >
              {/* Checkmark overlay */}
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <span className="text-3xl">{topic.icon}</span>
              <span className="text-sm font-medium">{topic.name}</span>
              <span className="text-xs text-muted-foreground">
                {topic._count.courses} {topic._count.courses === 1 ? 'course' : 'courses'}
              </span>
            </button>
          )
        })}
      </div>

      <Button
        onClick={onContinue}
        disabled={selectedTopics.length < 1}
        className="mt-2 h-12 w-full rounded-[var(--button-radius,0.5rem)] bg-[var(--color-primary)] text-base font-semibold text-white hover:bg-[var(--color-primary)]/90 disabled:opacity-40"
      >
        Continue
      </Button>
    </div>
  )
}
