'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { themeConfig } from '@/lib/theme'

type LessonProgress = {
  lessonCompleted: boolean
  quizPassed: boolean
}

type CourseOverviewProps = {
  course: {
    id: string
    slug: string
    title: string
    description?: string
    level?: string
    lessonsCount?: number
    estimatedMinutes?: number
    isFree?: boolean
    topic: {
      slug: string
      name: string
      icon: string
    }
    lessons: Array<{
      id: string
      slug: string
      title: string
      sortOrder: number
    }>
  }
  progress: Record<string, LessonProgress>
  isUserFree?: boolean
}

export function CourseOverview({ course, progress, isUserFree = true }: CourseOverviewProps) {
  const router = useRouter()
  const sortedLessons = [...course.lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  const topicColor = themeConfig.topicColors[course.topic.slug] ?? {
    bg: '#F3F4F6',
    text: '#374151',
  }

  // Calculate overall progress
  const completedCount = sortedLessons.filter(
    (l) => progress[l.id]?.lessonCompleted
  ).length
  const progressPercent = sortedLessons.length > 0
    ? Math.round((completedCount / sortedLessons.length) * 100)
    : 0

  // Determine CTA
  const allDone = completedCount === sortedLessons.length && sortedLessons.length > 0
  const firstIncomplete = sortedLessons.find(
    (l) => !progress[l.id]?.lessonCompleted
  )
  const hasStarted = completedCount > 0

  const ctaLabel = allDone ? 'Review Course' : hasStarted ? 'Continue Learning' : 'Start Course'
  const ctaTarget = allDone
    ? sortedLessons[0]
    : firstIncomplete ?? sortedLessons[0]

  const handleCta = () => {
    if (ctaTarget) {
      router.push(`/learn/${course.slug}/${ctaTarget.slug}`)
    }
  }

  // Lock logic
  const isLessonLocked = (index: number) => {
    if (course.isFree) return false
    if (!isUserFree) return false
    // Premium course + free user: first lesson free, rest locked
    return index > 0
  }

  const getLessonStatus = (lessonId: string, index: number): 'complete' | 'current' | 'locked' => {
    if (isLessonLocked(index)) return 'locked'
    if (progress[lessonId]?.lessonCompleted) return 'complete'
    if (
      index === 0 ||
      progress[sortedLessons[index - 1]?.id]?.lessonCompleted
    ) {
      return 'current'
    }
    return 'current' // Unlocked but not yet started
  }

  return (
    <div className="max-w-[680px] mx-auto px-4 py-8">
      {/* Topic pill */}
      <Badge
        className="mb-4"
        style={{
          backgroundColor: topicColor.bg,
          color: topicColor.text,
          border: 'none',
        }}
      >
        {course.topic.icon} {course.topic.name}
      </Badge>

      {/* Title and metadata */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {course.level && (
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        )}
        {course.lessonsCount != null && (
          <span className="text-sm text-gray-500">
            {course.lessonsCount} lessons
          </span>
        )}
        {course.estimatedMinutes != null && (
          <span className="text-sm text-gray-500">
            ~{course.estimatedMinutes} min
          </span>
        )}
      </div>

      {course.description && (
        <p className="text-gray-600 mb-6">{course.description}</p>
      )}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--color-primary)',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={handleCta}
        className="w-full mb-8"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
          borderRadius: 'var(--button-radius)',
        }}
      >
        {ctaLabel}
      </Button>

      {/* Lesson list */}
      <div className="space-y-3">
        {sortedLessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, index)

          return (
            <Card
              key={lesson.id}
              className={cn(
                'flex items-center gap-4 p-4 cursor-pointer transition-colors',
                status === 'locked' && 'opacity-60 cursor-not-allowed',
                themeConfig.isVA ? 'rounded-[16px]' : 'rounded-[12px]'
              )}
              onClick={() => {
                if (status !== 'locked') {
                  router.push(`/learn/${course.slug}/${lesson.slug}`)
                }
              }}
            >
              {/* Status icon */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm',
                  status === 'complete' && 'bg-green-100 text-green-600',
                  status === 'current' && 'text-white',
                  status === 'locked' && 'bg-gray-100 text-gray-400'
                )}
                style={
                  status === 'current'
                    ? { backgroundColor: 'var(--color-primary)' }
                    : undefined
                }
              >
                {status === 'complete' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {status === 'current' && <span>{index + 1}</span>}
                {status === 'locked' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <span className={cn(
                'text-sm font-medium flex-1',
                status === 'locked' ? 'text-gray-400' : 'text-gray-800'
              )}>
                {lesson.title}
              </span>

              {/* Quiz badge */}
              {progress[lesson.id]?.quizPassed && (
                <Badge
                  variant="outline"
                  className="text-xs text-green-600 border-green-200"
                >
                  Quiz passed
                </Badge>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
