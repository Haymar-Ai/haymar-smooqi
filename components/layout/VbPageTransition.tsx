'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

interface VbPageTransitionProps {
  children: React.ReactNode
}

export function VbPageTransition({ children }: VbPageTransitionProps) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    // Fade out then back in on route change
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 150ms ease',
      }}
    >
      {children}
    </div>
  )
}
