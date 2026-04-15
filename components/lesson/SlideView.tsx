'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { themeConfig } from '@/lib/theme'
import { HighlightedText } from './HighlightedText'

type SlideViewProps = {
  slide: {
    title?: string | null
    content: string
    imageUrl?: string | null
    imageAlt?: string | null
  }
  mode: 'read' | 'audio'
  currentWordIndex: number
}

export function SlideView({ slide, mode, currentWordIndex }: SlideViewProps) {
  return (
    <Card
      className={cn(
        'max-w-[680px] mx-auto p-8 bg-white',
        themeConfig.isVA
          ? 'rounded-[16px] shadow-lg border-0'
          : 'rounded-[12px] border'
      )}
    >
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
        <p
          className="uppercase text-sm font-semibold tracking-wide mb-2"
          style={{ color: 'var(--color-primary)' }}
        >
          {slide.title}
        </p>
      )}

      {mode === 'audio' ? (
        <HighlightedText text={slide.content} currentWordIndex={currentWordIndex} />
      ) : (
        <p style={{ fontSize: '17px', lineHeight: 1.7 }} className="text-gray-800">
          {slide.content}
        </p>
      )}
    </Card>
  )
}
