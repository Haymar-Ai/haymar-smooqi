'use client'

import { cn } from '@/lib/utils'

type LessonHeaderProps = {
  lessonTitle: string
  slideIndex: number
  totalSlides: number
  currentMode: 'read' | 'audio'
  onBack: () => void
  onToggleMode: (mode: 'read' | 'audio') => void
}

export function LessonHeader({
  lessonTitle,
  slideIndex,
  totalSlides,
  currentMode,
  onBack,
  onToggleMode,
}: LessonHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
      <button
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 -ml-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>

      <h1 className="text-sm font-semibold text-gray-900 truncate max-w-[180px] text-center">
        {lessonTitle}
      </h1>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{slideIndex + 1}/{totalSlides}</span>
        <div className="flex bg-gray-100 rounded-full p-0.5">
          <button
            onClick={() => onToggleMode('read')}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
              currentMode === 'read' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            Read
          </button>
          <button
            onClick={() => onToggleMode('audio')}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
              currentMode === 'audio' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
            )}
          >
            Audio
          </button>
        </div>
      </div>
    </div>
  )
}
