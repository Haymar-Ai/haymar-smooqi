'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { SmooqiLogo } from '@/components/ui/SmooqiLogo'
import { NotificationPopover } from '@/components/ui/NotificationPopover'
import type { NotificationItem } from '@/components/ui/NotificationDrawer'
import { themeConfig } from '@/lib/theme'

interface AppHeaderProps {
  userName: string
  userImage?: string
  streak: number
  level: number
  notifications: NotificationItem[]
  onMenuOpen: () => void
}

export function AppHeader({ streak, level, notifications, onMenuOpen }: AppHeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-14 md:h-16 items-center justify-between px-4 md:px-6 border-b shadow-sm"
      style={
        themeConfig.isVA
          ? {
              backgroundColor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderColor: 'rgba(209,213,219,0.5)',
            }
          : { backgroundColor: '#FFFFFF', borderColor: '#E8E4DC' }
      }
    >
      <Link href="/home">
        <SmooqiLogo size="small" />
      </Link>

      <div className="flex items-center gap-2">
        {streak > 0 && (
          themeConfig.isVA ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
              {'\uD83D\uDD25'} {streak}
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border"
              style={{ background: '#EAF4EF', color: '#1A6B4A', borderColor: '#C6DDD3' }}
            >
              {'\uD83D\uDCC5'} {streak}d
            </span>
          )
        )}
        {themeConfig.isVA ? (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
            Lvl {level}
          </span>
        ) : (
          <span
            className="inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold border"
            style={{ background: '#F5F0E8', color: '#57534E', borderColor: '#E8E4DC' }}
          >
            Level {level}
          </span>
        )}
        <NotificationPopover notifications={notifications} />
        <button
          onClick={onMenuOpen}
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
