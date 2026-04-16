'use client'

import Link from 'next/link'
import { themeConfig } from '@/lib/theme'

interface ContinueLearningCardProps {
  lessonTitle?: string
  courseName?: string
  courseSlug?: string
  lessonSlug?: string
}

export function ContinueLearningCard({
  lessonTitle,
  courseName,
  courseSlug,
  lessonSlug,
}: ContinueLearningCardProps) {
  if (!lessonTitle || !courseSlug || !lessonSlug) return null

  if (themeConfig.isVB) {
    return (
      <Link
        href={`/learn/${courseSlug}/${lessonSlug}`}
        className="block overflow-hidden rounded-[var(--card-radius)] p-4 border transition-shadow hover:shadow-md"
        style={{
          borderColor: '#E8E4DC',
          background: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        }}
      >
        <p
          className="text-[10px] uppercase tracking-widest font-semibold"
          style={{ color: '#A8A29E' }}
        >
          Continue Reading
        </p>
        <h3
          className="mt-1.5 text-lg font-bold leading-snug"
          style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
        >
          {lessonTitle}
        </h3>
        {courseName && (
          <p className="mt-0.5 text-sm" style={{ color: '#57534E' }}>
            {courseName}
          </p>
        )}

        <div className="mt-3">
          <span
            className="inline-block rounded-[var(--button-radius)] px-5 py-2 text-sm font-semibold"
            style={{ background: '#1A6B4A', color: '#FFFFFF' }}
          >
            Continue
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/learn/${courseSlug}/${lessonSlug}`}
      className="block relative overflow-hidden rounded-[var(--card-radius)] p-4 shadow-sm transition-shadow hover:shadow-md"
      style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -bottom-6 -right-6 rounded-full pointer-events-none"
        style={{
          width: 120,
          height: 120,
          backgroundColor: 'rgba(255,255,255,0.12)',
        }}
      />

      <p className="text-xs uppercase tracking-widest text-white/80 font-medium">
        Continue Learning
      </p>
      <h3 className="mt-1.5 text-xl font-bold text-white">{lessonTitle}</h3>
      {courseName && (
        <p className="mt-0.5 text-sm text-white/70">{courseName}</p>
      )}

      <div className="mt-3">
        <span className="inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-[var(--color-primary)]">
          Continue
        </span>
      </div>
    </Link>
  )
}
