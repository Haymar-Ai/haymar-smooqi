'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface MobileNavProps {
  userName: string
  userImage?: string
}

const bottomTabs = [
  { label: 'Home', href: '/home', icon: '🏠' },
  { label: 'Explore', href: '/explore', icon: '🔍' },
  { label: 'Games', href: '/word-games', icon: '🎮' },
  { label: 'Ranks', href: '/leaderboard', icon: '🏆' },
  { label: 'Profile', href: '/profile', icon: '👤' },
]

export function MobileNav({ }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Top header bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-white px-4 shadow-sm border-b border-gray-100">
        <Link href="/home" className="text-xl font-bold text-[var(--color-primary)]">
          Smooqi
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-medium">
            🔥 0
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            ⭐ 0 XP
          </Badge>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
        {bottomTabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors',
                isActive
                  ? 'text-[var(--color-primary)] font-semibold'
                  : 'text-gray-400'
              )}
            >
              <span className={cn('text-xl', isActive && 'scale-110 transition-transform')}>
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
