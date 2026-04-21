# Spec: Lesson Scroll, Animation, Dark Mode Global Fix

---

## Fix 1 — Quiz scroll-to-top on question advance

**File:** `components/lesson/LessonPlayer.tsx`

The `scrollTo` effect only tracks `state.phase` and `currentSlideIdx`. When user advances to next quiz question, phase stays `'quiz'` — no scroll.

Add `currentQuestion` to the scroll effect:

```ts
const currentQuestionIdx = state.phase === 'quiz' ? state.currentQuestion : -1

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
}, [state.phase, currentSlideIdx, currentQuestionIdx])
```

---

## Fix 2 — Slide animation laggy on desktop

**File:** `components/lesson/LessonPlayer.tsx`

Current: `transition={{ duration: 0.25, ease: 'easeInOut' }}` with pixel-offset variants.

Replace with spring physics — feels natural on both mobile and desktop:

```ts
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -30 : 30, opacity: 0 }),
}
```

```tsx
transition={{
  x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.15 },
}}
```

Small offsets (60px enter, 30px exit) + spring = snappy and smooth without layout shift on desktop. Keep `AnimatePresence mode="wait"`.

---

## Fix 3 — Dark mode: global approach instead of component-by-component

**The problem:** Dozens of components use hardcoded hex colors in inline `style` props. CSS class overrides can't reach inline styles. A component-by-component approach will take forever and miss things.

**The solution:** Use CSS `color-scheme` + override the CSS custom properties at the `:root.dark` level, combined with a broad `*` selector sweep.

**File:** `app/globals.css` — replace the current dark mode block entirely with:

```css
/* ═══════════════════════════════════════════
   DARK MODE — Global override
   ═══════════════════════════════════════════ */

.dark {
  color-scheme: dark;
}

/* Base */
.dark body {
  background: #0f0f0f !important;
  color: #e8e8e8;
}

/* All white/light backgrounds → dark */
.dark .bg-white,
.dark [class*="bg-white"],
.dark .glass-card,
.dark [class*="glass-card"] {
  background-color: #1e1e1e !important;
}
.dark .bg-gray-50 { background-color: #181818 !important; }
.dark .bg-gray-100 { background-color: #2a2a2a !important; }
.dark .bg-gray-200 { background-color: #333 !important; }

/* Text */
.dark .text-gray-900,
.dark .text-gray-800 { color: #f0f0f0 !important; }
.dark .text-gray-700,
.dark .text-gray-600 { color: #c8c8c8 !important; }
.dark .text-gray-500,
.dark .text-gray-400 { color: #909090 !important; }
.dark .text-black { color: #f0f0f0 !important; }

/* Borders */
.dark .border-gray-100 { border-color: #2a2a2a !important; }
.dark .border-gray-200 { border-color: #333 !important; }
.dark .border-gray-300 { border-color: #444 !important; }
.dark .border-t,
.dark .border-b { border-color: #2a2a2a !important; }

/* Cards (shadcn Card component renders as bg-white border) */
.dark [data-slot="card"],
.dark .rounded-\[16px\],
.dark .rounded-\[var\(--card-radius\)\] {
  background-color: #1e1e1e !important;
  border-color: #2a2a2a !important;
}

/* Inputs */
.dark input,
.dark textarea,
.dark select {
  background-color: #2a2a2a !important;
  border-color: #444 !important;
  color: #f0f0f0 !important;
}
.dark input::placeholder,
.dark textarea::placeholder { color: #666 !important; }

/* Buttons */
.dark .hover\:bg-gray-50:hover { background-color: #252525 !important; }
.dark .hover\:bg-gray-100:hover { background-color: #2a2a2a !important; }

/* Badges */
.dark .bg-green-50,
.dark .bg-green-100 { background-color: #0d2a1a !important; }
.dark .text-green-600,
.dark .text-green-700 { color: #4ade80 !important; }
.dark .border-green-200 { border-color: #1a4a2a !important; }
.dark .bg-blue-50 { background-color: #0d1a2a !important; }
.dark .text-blue-600 { color: #60a5fa !important; }
.dark .bg-red-50 { background-color: #2a0d0d !important; }
.dark .text-red-600 { color: #f87171 !important; }
.dark .bg-yellow-50 { background-color: #2a2a0d !important; }
.dark .bg-purple-50,
.dark .bg-\[var\(--color-primary-light\)\] { background-color: #1a0d2a !important; }

/* Separators */
.dark [role="separator"] { background-color: #2a2a2a !important; }

/* Progress bar track */
.dark .bg-gray-100.rounded-full { background-color: #2a2a2a !important; }

/* Sticky/backdrop headers */
.dark .bg-white\/80,
.dark .bg-white\/85,
.dark .bg-white\/90,
.dark [class*="bg-white/"] {
  background-color: rgba(20, 20, 20, 0.92) !important;
}

/* Nav drawer — hardcoded inline style override via class */
.dark .nav-drawer-panel {
  background-color: #1a1a1a !important;
}

/* Notification popover */
.dark .notification-popover {
  background-color: #1e1e1e !important;
  border-color: #333 !important;
}
.dark .notification-popover * { color: #e0e0e0 !important; }
.dark .notification-popover .text-gray-400 { color: #888 !important; }
.dark .notification-popover .hover\:bg-gray-50:hover { background-color: #2a2a2a !important; }

/* App header */
.dark .app-header-bar {
  background-color: rgba(18, 18, 18, 0.95) !important;
  border-color: #2a2a2a !important;
}
```

**File:** `components/layout/NavDrawer.tsx`

Replace the hardcoded inline style on `<motion.aside>`:
```tsx
// Remove: style={{ background: drawerBg, backgroundColor: drawerBg }}
// Replace with className addition:
className="nav-drawer-panel fixed top-0 right-0 z-50 flex h-full w-[280px] flex-col shadow-xl bg-white"
```

**File:** `components/layout/AppHeader.tsx`

Add `app-header-bar` class to the header's outermost element.

**File:** `components/ui/NotificationPopover.tsx`

Add `notification-popover` class to the dropdown `<motion.div>` (already in spec, confirm it's present).

---

## Fix 4 — Celebrations confirmed present (verify only)

`LessonComplete`, `QuizSummary`, and `CourseComplete` all exist and have confetti/animation. No code change needed — just verify in testing that:
- Completing a lesson shows `LessonComplete` with confetti ✅
- Passing a quiz shows `QuizSummary` with confetti ✅
- Completing the last lesson of a course shows `CourseComplete` ✅

If any are missing, check that `phase` transitions are firing correctly in `LessonPlayer`.

---

## Constraints
- No changes to vB layout, API routes, auth, or DB
- The dark mode CSS should be a single consolidated block in `globals.css` — remove the old piecemeal overrides and replace with this complete version
- TypeScript must compile clean

## Verification
- Answering quiz question + clicking Next → scrolls to top of next question
- Slide transitions smooth on desktop (spring, small offset)
- All pages readable in dark mode: home, explore, lessons, quiz, course overview, settings, profile, word games, nav drawer, notification popover
- No white-on-white or dark-on-dark text anywhere visible
