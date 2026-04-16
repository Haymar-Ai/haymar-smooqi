'use client'

import Link from 'next/link'
import { themeConfig } from '@/lib/theme'

interface AchievementsWidgetProps {
  achievementCount: number
}

export function AchievementsWidget({ achievementCount }: AchievementsWidgetProps) {
  if (themeConfig.isVB) {
    return (
      <Link
        href="/achievements"
        className="block text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: 'var(--color-primary)' }}
      >
        {achievementCount} of 29 collected &rarr;
      </Link>
    )
  }

  return (
    <Link
      href="/achievements"
      className="block text-sm font-medium transition-colors hover:opacity-80"
      style={{ color: 'var(--color-primary)' }}
    >
      &#127941; {achievementCount}/29 achievements unlocked &rarr;
    </Link>
  )
}
