'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { themeConfig } from '@/lib/theme'
import { HighlightedText } from './HighlightedText'
import { LessonHeader } from './LessonHeader'

type SlideViewProps = {
  slide: {
    title?: string | null
    content: string
    imageUrl?: string | null
    imageAlt?: string | null
  }
  mode: 'read' | 'audio'
  currentWordIndex: number
  isFirst?: boolean
  isLast?: boolean
  topicIcon?: string
  lessonTitle?: string
  slideIndex?: number
  totalSlides?: number
  onBack?: () => void
}

function formatSlideContent(content: string) {
  const lines = content.split('\n').filter((line) => line.trim() !== '')
  const elements: React.ReactNode[] = []
  let bulletBuffer: string[] = []
  let orderedBuffer: { num: string; text: string }[] = []

  const isVB = themeConfig.isVB
  const bodyFontSize = isVB ? '16px' : '15px'
  const bodyLineHeight = isVB ? 1.85 : 1.7
  const bodyColor = isVB ? '#57534E' : undefined

  function flushBullets() {
    if (bulletBuffer.length === 0) return
    elements.push(
      <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 pl-5">
        {bulletBuffer.map((item, i) => (
          <li
            key={i}
            className={cn('list-disc', !isVB && 'text-gray-700')}
            style={{ fontSize: bodyFontSize, lineHeight: bodyLineHeight, color: bodyColor }}
          >
            {formatInline(item)}
          </li>
        ))}
      </ul>
    )
    bulletBuffer = []
  }

  function flushOrdered() {
    if (orderedBuffer.length === 0) return
    elements.push(
      <ol key={`ol-${elements.length}`} className="my-3 space-y-1.5 pl-5">
        {orderedBuffer.map((item, i) => (
          <li
            key={i}
            className={cn('list-decimal', !isVB && 'text-gray-700')}
            style={{ fontSize: bodyFontSize, lineHeight: bodyLineHeight, color: bodyColor }}
          >
            {formatInline(item.text)}
          </li>
        ))}
      </ol>
    )
    orderedBuffer = []
  }

  function formatInline(text: string): React.ReactNode {
    // Handle **bold** markdown
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    if (parts.length === 1) return text
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Bullet list items
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      flushOrdered()
      const text = trimmed.startsWith('- ') ? trimmed.slice(2) : trimmed.slice(2)
      bulletBuffer.push(text)
      continue
    }

    // Numbered list items
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/)
    if (numberedMatch) {
      flushBullets()
      orderedBuffer.push({ num: numberedMatch[1], text: numberedMatch[2] })
      continue
    }

    // Regular text line - flush any pending lists
    flushBullets()
    flushOrdered()

    // Split by sentences for lead text treatment
    // Only do sentence splitting for the first text block
    if (elements.length === 0) {
      const sentences = trimmed.split(/(?<=\.)\s+/)
      if (sentences.length > 1) {
        elements.push(
          <p
            key={`lead-${elements.length}`}
            className={cn('mb-2', !isVB && 'text-lg font-medium text-gray-900')}
            style={
              isVB
                ? { fontSize: '18px', fontWeight: 500, color: '#1C1917', lineHeight: 1.85 }
                : { lineHeight: 1.6 }
            }
          >
            {formatInline(sentences[0])}
          </p>
        )
        elements.push(
          <p
            key={`body-${elements.length}`}
            className={cn('mb-2', !isVB && 'text-gray-700')}
            style={{ fontSize: bodyFontSize, lineHeight: bodyLineHeight, color: bodyColor }}
          >
            {formatInline(sentences.slice(1).join(' '))}
          </p>
        )
      } else {
        elements.push(
          <p
            key={`lead-${elements.length}`}
            className={cn('mb-2', !isVB && 'text-lg font-medium text-gray-900')}
            style={
              isVB
                ? { fontSize: '18px', fontWeight: 500, color: '#1C1917', lineHeight: 1.85 }
                : { lineHeight: 1.6 }
            }
          >
            {formatInline(trimmed)}
          </p>
        )
      }
    } else {
      elements.push(
        <p
          key={`p-${elements.length}`}
          className={cn('mb-2', !isVB && 'text-gray-700')}
          style={{ fontSize: bodyFontSize, lineHeight: bodyLineHeight, color: bodyColor }}
        >
          {formatInline(trimmed)}
        </p>
      )
    }
  }

  // Flush remaining
  flushBullets()
  flushOrdered()

  return elements
}

export function SlideView({ slide, mode, currentWordIndex, isFirst, isLast, topicIcon, lessonTitle, slideIndex, totalSlides, onBack }: SlideViewProps) {
  const icon = topicIcon || '💡'
  const isVB = themeConfig.isVB

  return (
    <Card
      className={cn(
        'max-w-[680px] mx-auto bg-white',
        isVB ? 'p-6 md:p-10 rounded-[10px] border' : 'p-8',
        themeConfig.isVA
          ? 'rounded-[16px] shadow-lg border-0'
          : !isVB && 'rounded-[12px] border'
      )}
      style={
        isVB
          ? { borderColor: '#E8E4DC', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' }
          : undefined
      }
    >
      {lessonTitle && onBack && (
        <LessonHeader
          lessonTitle={lessonTitle}
          slideIndex={slideIndex ?? 0}
          totalSlides={totalSlides ?? 1}
          onBack={onBack}
        />
      )}

      {/* First slide: topic emoji */}
      {isFirst && (
        isVB ? (
          <div className="mb-6 flex justify-start">
            <span className="text-2xl">{icon}</span>
          </div>
        ) : (
          <div className="mb-4 text-center">
            <span className="text-4xl">{icon}</span>
          </div>
        )
      )}

      {/* Last slide: Key Takeaway label */}
      {isLast && (
        isVB ? (
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#A8A29E' }}
          >
            Key Takeaway
          </p>
        ) : (
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            Key Takeaway
          </p>
        )
      )}

      {slide.imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt || ''}
            fill
            className="object-cover"
          />
        </div>
      )}

      {slide.title && (
        isVB ? (
          <p
            className="text-base font-bold mb-3"
            style={{ color: '#1A6B4A', fontFamily: 'var(--font-playfair)' }}
          >
            {slide.title}
          </p>
        ) : (
          <p
            className={cn(
              'uppercase font-semibold tracking-wide mb-2',
              isFirst ? 'text-base text-center' : 'text-sm'
            )}
            style={{ color: 'var(--color-primary)' }}
          >
            {slide.title}
          </p>
        )
      )}

      {mode === 'audio' ? (
        <HighlightedText text={slide.content} currentWordIndex={currentWordIndex} />
      ) : (
        <div className={cn(isLast && !isVB && 'text-lg', isFirst && !isVB && 'text-center')}>
          {formatSlideContent(slide.content)}
        </div>
      )}
    </Card>
  )
}
