'use client'

import { themeConfig } from '@/lib/theme'

type HighlightedTextProps = {
  text: string
  currentWordIndex: number
}

export function HighlightedText({ text, currentWordIndex }: HighlightedTextProps) {
  // Split text preserving whitespace tokens
  const tokens = text.split(/(\s+)/)
  let wordIdx = -1

  return (
    <p style={{ fontSize: '17px', lineHeight: 1.7 }}>
      {tokens.map((token, i) => {
        // Whitespace token
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>
        }

        wordIdx++
        const isHighlighted = wordIdx === currentWordIndex

        return (
          <span
            key={i}
            className={
              isHighlighted
                ? themeConfig.isVA
                  ? 'bg-yellow-200 rounded px-0.5 transition-colors duration-150'
                  : 'bg-orange-100 rounded px-0.5 transition-colors duration-150'
                : 'transition-colors duration-150'
            }
          >
            {token}
          </span>
        )
      })}
    </p>
  )
}
