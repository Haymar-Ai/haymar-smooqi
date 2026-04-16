'use client'

import { useRouter } from 'next/navigation'
import { themeConfig } from '@/lib/theme'

type LessonProgress = {
  lessonCompleted: boolean
  quizPassed: boolean
}

type VbCourseOverviewProps = {
  course: {
    id: string
    slug: string
    title: string
    description?: string | null
    level?: string | null
    lessonCount?: number | null
    estimatedMinutes?: number | null
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

export function VbCourseOverview({ course, progress, isUserFree = true }: VbCourseOverviewProps) {
  const router = useRouter()
  const sortedLessons = [...course.lessons].sort((a, b) => a.sortOrder - b.sortOrder)
  const topicColor = themeConfig.topicColors[course.topic.slug] ?? { bg: '#F5F5F0', text: '#57534E' }

  const completedCount = sortedLessons.filter((l) => progress[l.id]?.lessonCompleted).length
  const progressPercent =
    sortedLessons.length > 0 ? Math.round((completedCount / sortedLessons.length) * 100) : 0
  const allDone = completedCount === sortedLessons.length && sortedLessons.length > 0
  const firstIncomplete = sortedLessons.find((l) => !progress[l.id]?.lessonCompleted)
  const hasStarted = completedCount > 0
  const ctaLabel = allDone ? 'Review Course' : hasStarted ? 'Continue Learning' : 'Start Course'
  const ctaTarget = allDone ? sortedLessons[0] : firstIncomplete ?? sortedLessons[0]

  const isLessonLocked = (index: number) => {
    if (course.isFree) return false
    if (!isUserFree) return false
    return index > 0
  }

  return (
    <div>
      {/* Topic color band */}
      <div
        className="rounded-t-[var(--card-radius)] px-5 py-4 flex items-center gap-3"
        style={{ backgroundColor: topicColor.bg }}
      >
        <span className="text-2xl">{course.topic.icon}</span>
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: topicColor.text }}
        >
          {course.topic.name}
        </span>
      </div>

      {/* Course info */}
      <div
        className="bg-white border border-t-0 rounded-b-[var(--card-radius)] px-5 py-5 mb-5"
        style={{ borderColor: '#E8E4DC' }}
      >
        <h1
          className="text-2xl font-bold leading-tight mb-2"
          style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
        >
          {course.title}
        </h1>
        {course.description && (
          <p className="text-sm mb-3 leading-relaxed" style={{ color: '#57534E' }}>
            {course.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs mb-4" style={{ color: '#A8A29E' }}>
          {course.level && <span className="capitalize">{course.level}</span>}
          {course.lessonCount != null && <span>{course.lessonCount} lessons</span>}
          {course.estimatedMinutes != null && <span>{course.estimatedMinutes} min</span>}
          {course.isFree && (
            <span
              className="font-semibold px-2 py-0.5 rounded"
              style={{ background: '#EAF4EF', color: '#1A6B4A' }}
            >
              FREE
            </span>
          )}
        </div>

        {/* 2px progress line */}
        {progressPercent > 0 && (
          <div className="mb-2">
            <div className="h-[2px] w-full rounded-full" style={{ background: '#E8E4DC' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%`, background: '#1A6B4A' }}
              />
            </div>
            <p className="text-xs mt-1.5" style={{ color: '#A8A29E' }}>
              {completedCount} of {sortedLessons.length} lesson
              {sortedLessons.length !== 1 ? 's' : ''} complete
            </p>
          </div>
        )}

        {/* CTA button */}
        {ctaTarget && (
          <button
            onClick={() => router.push(`/learn/${course.slug}/${ctaTarget.slug}`)}
            className="w-full py-3 rounded-[var(--button-radius)] text-sm font-semibold text-white mt-3 transition-opacity hover:opacity-90"
            style={{ background: '#1A6B4A' }}
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {/* Lesson list */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: '#A8A29E', fontFamily: 'var(--font-inter)' }}
        >
          Lessons
        </h2>
        <div
          className="bg-white border rounded-[var(--card-radius)] overflow-hidden"
          style={{ borderColor: '#E8E4DC' }}
        >
          {sortedLessons.map((lesson, index) => {
            const lessonDone = progress[lesson.id]?.lessonCompleted
            const quizPassed = progress[lesson.id]?.quizPassed
            const locked = isLessonLocked(index)

            return (
              <button
                key={lesson.id}
                disabled={locked}
                onClick={() => !locked && router.push(`/learn/${course.slug}/${lesson.slug}`)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors border-b last:border-b-0 ${
                  locked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAFAF6]'
                }`}
                style={{ borderColor: '#E8E4DC' }}
              >
                {/* Status indicator */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                  style={
                    lessonDone
                      ? { background: '#EAF4EF', color: '#1A6B4A' }
                      : locked
                      ? { background: '#F5F5F0', color: '#A8A29E' }
                      : { background: '#F5F5F0', color: '#57534E' }
                  }
                >
                  {lessonDone ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : locked ? (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Lesson title */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: locked ? '#A8A29E' : '#1C1917' }}
                  >
                    {lesson.title}
                  </p>
                  {quizPassed && (
                    <p className="text-xs mt-0.5" style={{ color: '#1A6B4A' }}>
                      Quiz passed
                    </p>
                  )}
                </div>

                {/* Arrow */}
                {!locked && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: '#A8A29E', flexShrink: 0 }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
