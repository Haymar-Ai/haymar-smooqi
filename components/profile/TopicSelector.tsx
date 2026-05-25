'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TopicData {
  id: string
  slug: string
  name: string
  icon: string
}

interface TopicSelectorProps {
  allTopics: TopicData[]
  selectedSlugs: string[]
}

export function TopicSelector({ allTopics, selectedSlugs }: TopicSelectorProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedSlugs))
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  function lockScroll() {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
  }

  function unlockScroll() {
    const top = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, -parseInt(top || '0'))
  }

  function openSheet() {
    lockScroll()
    setIsOpen(true)
  }

  function closeSheet() {
    unlockScroll()
    setIsOpen(false)
  }

  function toggleTopic(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        if (next.size <= 1) return prev
        next.delete(slug)
      } else {
        if (next.size >= 5) return prev
        next.add(slug)
      }
      return next
    })
  }

  async function handleSave() {
    setSaving(true)
    const added = Array.from(selected).filter((s) => !selectedSlugs.includes(s))
    const removed = selectedSlugs.filter((s) => !selected.has(s))

    for (const slug of added.concat(removed)) {
      await fetch(`/api/topics/${slug}/toggle`, { method: 'POST' }).catch(() => {})
    }

    setSaving(false)
    unlockScroll()
    setIsOpen(false)
    router.refresh()
  }

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40"
            style={{ zIndex: 9998 }}
            onClick={closeSheet}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 9999, pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl flex flex-col"
              style={{
                pointerEvents: 'auto',
                maxHeight: '80vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Select Topics</h2>
                <button
                  onClick={closeSheet}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="overflow-y-auto overscroll-contain flex-1">
                <div className="grid grid-cols-2 gap-2 p-5">
                  {allTopics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => toggleTopic(t.slug)}
                      className={cn(
                        'flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                        selected.has(t.slug)
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] text-gray-900'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="flex-1 truncate">{t.name}</span>
                      {selected.has(t.slug) && <span className="text-xs">{'✓'}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 flex-shrink-0 bg-white rounded-b-2xl">
                <p className="text-xs text-gray-500">{selected.size}/5 selected</p>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-primary-foreground)',
                    borderRadius: 'var(--button-radius)',
                  }}
                >
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={openSheet}
        className="rounded-full text-xs"
      >
        + Add topics
      </Button>

      {mounted && createPortal(modal, document.body)}
    </>
  )
}
