# Spec: Dark Mode Fixes — Default Light, Notification Contrast, Full Audit

---

## Fix 1 — Default to Light mode (not System)

### `app/layout.tsx` — init script
Change the early-init script so it only applies dark class if the user has explicitly saved `'dark'`. Remove the `system` / `prefers-color-scheme` fallback:

```ts
// Change from:
`try { var t = localStorage.getItem('smooqi-theme'); if (t === 'dark' || ((!t || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.classList.add('dark'); } } catch(e) {}`

// Change to:
`try { if (localStorage.getItem('smooqi-theme') === 'dark') { document.documentElement.classList.add('dark'); } } catch(e) {}`
```

### `app/(app)/settings/page.tsx`
- Change default state from `'system'` to `'light'`:
  ```ts
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light')
  ```
- In `applyThemeMode`, for `'system'` mode, default to light (remove prefers-color-scheme check or treat system = light):
  ```ts
  function applyThemeMode(mode: 'light' | 'dark' | 'system') {
    localStorage.setItem('smooqi-theme', mode)
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      // both 'light' and 'system' default to light
      document.documentElement.classList.remove('dark')
    }
  }
  ```

---

## Fix 2 — Notification popover hard to read in dark mode

**File:** `app/globals.css`

The notification popover uses `bg-white`, `text-gray-900`, `border-gray-100` — all override to dark colors in dark mode. Add explicit dark overrides:

```css
.dark .notification-popover {
  background-color: #2a2a2a !important;
  border-color: #444 !important;
}
.dark .notification-popover p,
.dark .notification-popover span {
  color: #f0f0f0 !important;
}
.dark .notification-popover .text-gray-400 {
  color: #a0a0a0 !important;
}
.dark .notification-popover .hover\:bg-gray-50:hover {
  background-color: #333 !important;
}
.dark .notification-popover .border-b {
  border-color: #444 !important;
}
```

**File:** `components/ui/NotificationPopover.tsx`

Add `notification-popover` class to the dropdown container:
```tsx
className="notification-popover absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 z-50 overflow-hidden"
```

---

## Fix 3 — Full dark mode audit — add missing overrides to `globals.css`

The current dark CSS only covers a handful of classes. Add comprehensive overrides for all components:

```css
/* Cards and containers */
.dark .rounded-2xl,
.dark .rounded-xl,
.dark [class*="rounded-"][class*="bg-white"] {
  background-color: #1e1e1e !important;
}

/* Form inputs */
.dark input,
.dark textarea,
.dark select {
  background-color: #2a2a2a !important;
  border-color: #444 !important;
  color: #f0f0f0 !important;
}
.dark input::placeholder,
.dark textarea::placeholder {
  color: #777 !important;
}

/* Buttons */
.dark button.bg-white,
.dark .bg-gray-50 { background-color: #2a2a2a !important; }
.dark .bg-gray-100 { background-color: #333 !important; }
.dark .hover\:bg-gray-50:hover { background-color: #2a2a2a !important; }
.dark .hover\:bg-gray-100:hover { background-color: #333 !important; }

/* Text */
.dark .text-gray-800 { color: #e8e8e8 !important; }
.dark .text-gray-600 { color: #c0c0c0 !important; }
.dark .text-gray-400 { color: #888 !important; }

/* Borders */
.dark .border-gray-100 { border-color: #2a2a2a !important; }
.dark .border-gray-300 { border-color: #555 !important; }

/* Badges */
.dark .bg-green-100 { background-color: #1a3a2a !important; }
.dark .bg-blue-50 { background-color: #1a2a3a !important; }
.dark .bg-red-50 { background-color: #3a1a1a !important; }
.dark .bg-yellow-50 { background-color: #3a3a1a !important; }

/* Sidebar/AppShell */
.dark [style*="--sidebar-bg"] {
  --sidebar-bg: rgba(20, 20, 20, 0.95) !important;
}

/* Progress bars */
.dark .bg-gray-100.rounded-full { background-color: #333 !important; }

/* Separator */
.dark [role="separator"],
.dark .border-t { border-color: #333 !important; }

/* Sticky nav/header */
.dark .bg-white\/90,
.dark .backdrop-blur-sm.bg-white\/90 {
  background-color: rgba(20, 20, 20, 0.92) !important;
}

/* Quiz explanation card */
.dark .bg-blue-50.rounded-xl {
  background-color: #1a2535 !important;
  border-color: #2a4060 !important;
}
.dark .bg-blue-50 .text-gray-700 { color: #c8d8e8 !important; }

/* Settings page cards */
.dark .glass-card {
  background: rgba(30, 30, 30, 0.92) !important;
  border-color: rgba(255,255,255,0.08) !important;
}

/* Muted foreground */
.dark .text-muted-foreground { color: #a0a0a0 !important; }
.dark .bg-muted\/30 { background-color: #1a1a1a !important; }
```

---

## Constraints
- No changes to DB, API routes, auth, or middleware
- No changes to vB layout (vB has its own color system)
- TypeScript must compile clean
- Dark mode changes are CSS-only — no server-side rendering changes

## Verification
- New users (no localStorage) → light mode by default
- Existing users who chose 'system' → light mode on next visit
- Notification popover in dark mode: white text on dark background, readable
- Cards, inputs, buttons all readable in dark mode
- Quiz explanation card readable in dark mode
- No white-on-white or dark-on-dark text anywhere obvious

---

## Fix 4 — Nav drawer hard to read in dark mode

**File:** `components/layout/NavDrawer.tsx`

**Problem:** `drawerBg` is hardcoded as `'#FFFFFF'` in an inline style — CSS class overrides can't affect it. Nav text uses Tailwind classes that ARE overridable.

**Fix:** Make `drawerBg` dark-mode aware using a `useEffect` + `useState` to read the current theme, OR simply use a CSS variable:

Change:
```ts
const drawerBg = '#FFFFFF'
```

To:
```ts
// Remove drawerBg variable entirely
```

And on the `<motion.aside>`, replace inline style with a className:
```tsx
// Remove: style={{ background: drawerBg, backgroundColor: drawerBg }}
// Add className: "bg-white dark:bg-[#1e1e1e]"
```

Also add dark mode text overrides to the nav drawer items in `globals.css`:
```css
/* Nav drawer dark mode */
.dark .nav-drawer { background-color: #1e1e1e !important; }
.dark .nav-drawer .text-gray-900 { color: #f0f0f0 !important; }
.dark .nav-drawer .text-gray-600 { color: #c0c0c0 !important; }
.dark .nav-drawer .text-gray-500 { color: #a0a0a0 !important; }
.dark .nav-drawer .text-gray-400 { color: #777 !important; }
.dark .nav-drawer .hover\:bg-gray-100:hover { background-color: #2a2a2a !important; }
.dark .nav-drawer .border-b { border-color: #333 !important; }
.dark .nav-drawer .bg-[var(--color-primary-light)] { background-color: #2a1f3d !important; }
```

Add `nav-drawer` class to the `<motion.aside>` element.

Also add to the same globals.css block — AppHeader dark mode (top bar):
```css
.dark .app-header { background-color: rgba(20,20,20,0.95) !important; border-color: #333 !important; }
.dark .app-header .text-gray-700 { color: #d0d0d0 !important; }
.dark .app-header .text-gray-500 { color: #a0a0a0 !important; }
.dark .app-header .hover\:bg-gray-100:hover { background-color: #2a2a2a !important; }
```

Add `app-header` class to the top header component (`AppHeader.tsx`).

---

## Fix 5 — Lesson components dark mode (SlideView, QuizQuestion, LessonPlayer, LessonComplete)

These components use hardcoded hex colors in inline `style` props — CSS overrides can't reach them. The fix is to add dark-mode-aware CSS targeting the wrapper classes, plus change the `bg-white` card to support dark mode.

**Add to `globals.css`:**

```css
/* ── Lesson slide card ── */
.dark .lesson-slide-card {
  background-color: #1e1e1e !important;
  color: #f0f0f0 !important;
}
.dark .lesson-slide-card p,
.dark .lesson-slide-card li,
.dark .lesson-slide-card span {
  color: #e0e0e0 !important;
}
.dark .lesson-slide-card strong { color: #f5f5f5 !important; }

/* ── Quiz question card ── */
.dark .quiz-question-card {
  background-color: rgba(30,30,30,0.92) !important;
  color: #f0f0f0 !important;
}
.dark .quiz-question-card p { color: #e0e0e0 !important; }
/* Quiz options */
.dark .quiz-option-btn {
  background-color: #2a2a2a !important;
  border-color: #444 !important;
  color: #e0e0e0 !important;
}
.dark .quiz-option-btn:hover {
  background-color: #333 !important;
  border-color: #555 !important;
}
/* Explanation card */
.dark .quiz-explanation {
  background-color: #1a2535 !important;
  color: #c8d8e8 !important;
}
.dark .quiz-explanation span { color: #b0c8e0 !important; }

/* ── Lesson player controls ── */
.dark .lesson-controls {
  background-color: rgba(20,20,20,0.95) !important;
  border-color: #333 !important;
}
.dark .lesson-controls .bg-gray-100 { background-color: #2a2a2a !important; }
.dark .lesson-controls .bg-white { background-color: #3a3a3a !important; }
.dark .lesson-controls .text-gray-900 { color: #f0f0f0 !important; }
.dark .lesson-controls .text-gray-500 { color: #a0a0a0 !important; }
.dark .lesson-controls .bg-gray-100.rounded-full { background-color: #2a2a2a !important; }

/* ── Progress bar track ── */
.dark .lesson-progress-track { background-color: #333 !important; }
```

**File changes needed:**

1. `components/lesson/SlideView.tsx` — add `lesson-slide-card` class to the vA `<Card>` component:
   ```tsx
   <Card className={cn('lesson-slide-card max-w-[680px] mx-auto bg-white', 'p-8', ...)} >
   ```

2. `components/lesson/QuizQuestion.tsx` — add `quiz-question-card` to the vA wrapper div, `quiz-option-btn` to each option button, `quiz-explanation` to the explanation div:
   ```tsx
   <div className="quiz-question-card max-w-[680px] mx-auto bg-white/85 ...">
   <button className={cn('quiz-option-btn w-full text-left p-4 ...', getOptionStyles(key))}>
   <div className="quiz-explanation mt-4 p-4 bg-blue-50 ...">
   ```

3. `components/lesson/LessonPlayer.tsx` — add `lesson-controls` to the nav container div, `lesson-progress-track` to the progress bar background div.

**Note:** vB lesson components already use their own color system (`#1C1917`, `#57534E` etc) — do NOT add dark overrides for vB. Only target vA.

---

## Fix 6 — Course Overview page dark mode

**File:** `components/lesson/CourseOverview.tsx`

Add `course-overview` class to the root div:
```tsx
<div className="course-overview max-w-[680px] mx-auto px-4 py-8">
```

**Add to `globals.css`:**
```css
/* ── Course Overview ── */
.dark .course-overview h1 { color: #f0f0f0 !important; }
.dark .course-overview p { color: #c0c0c0 !important; }
.dark .course-overview .text-gray-900 { color: #f0f0f0 !important; }
.dark .course-overview .text-gray-800 { color: #e0e0e0 !important; }
.dark .course-overview .text-gray-600 { color: #c0c0c0 !important; }
.dark .course-overview .text-gray-500 { color: #a0a0a0 !important; }
.dark .course-overview .text-gray-400 { color: #777 !important; }
.dark .course-overview .bg-gray-100 { background-color: #2a2a2a !important; }
.dark .course-overview .h-2.bg-gray-100 { background-color: #333 !important; }

/* Lesson cards in course overview */
.dark .course-overview [class*="rounded-"] {
  background-color: #1e1e1e !important;
  border-color: #333 !important;
}
.dark .course-overview .bg-green-100 { background-color: #1a3a2a !important; }
.dark .course-overview .text-green-600 { color: #4ade80 !important; }
.dark .course-overview .border-green-200 { border-color: #2a5a3a !important; }
```

---

## Fix 7 — Course card titles unreadable in dark mode

**File:** `components/course/CourseCard.tsx`

The card title uses `style={{ color: '#1C1917' }}` — hardcoded inline, CSS can't reach it.

**Fix:** Remove the inline color and use a Tailwind class instead:
```tsx
// Change:
style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
// To:
className="text-sm font-bold line-clamp-2 leading-snug flex-1 dark:text-gray-100"
style={{ fontFamily: 'var(--font-playfair)' }}
```

Do the same for the description and metadata text that use `style={{ color: '#57534E' }}` and `style={{ color: '#A8A29E' }}`:
- `#57534E` → add `dark:text-gray-300` via className
- `#A8A29E` → add `dark:text-gray-400` via className

For the vA card title (`text-gray-900`) — the global CSS already handles this via `.dark .text-gray-900`.

---

## Fix 8 — Smooqi logo "Sm" invisible in dark mode

**File:** `components/ui/SmooqiLogo.tsx`

The "Sm" part uses `style={{ color: '#111827' }}` — pure near-black, unreadable on dark backgrounds.

**Fix:** Use a dynamic color based on dark mode, or use a CSS class:
```tsx
// Change:
<span style={{ color: '#111827' }}>Sm</span>
// To:
<span className="text-gray-900 dark:text-gray-100">Sm</span>
```

The `dark:text-gray-100` Tailwind class will make it near-white in dark mode.

---

## Fix 9 — Global inline color sweep (ALL remaining hardcoded dark text)

Rather than touching 15+ files, add these to `globals.css` dark mode block. These target the specific hex values used throughout as inline styles. CSS `color` property can be overridden by a more specific selector when using `!important`.

**Add to the `.dark` block in `globals.css`:**

```css
/* ── Inline hex color overrides — covers all components using these exact values ── */
/* These are the dark text colors used throughout in inline styles */

/* #1C1917, #111827, #374151 — near-black text */
.dark [style*="color: rgb(28, 25, 23)"],
.dark [style*="color:#1C1917"],
.dark [style*="color: #1C1917"],
.dark [style*='color: "#1C1917"'],
.dark [style*="color: rgb(17, 24, 39)"],
.dark [style*="color:#111827"],
.dark [style*="color: #111827"],
.dark [style*="color: rgb(55, 65, 81)"],
.dark [style*="color:#374151"],
.dark [style*="color: #374151"] {
  color: #f0f0f0 !important;
}

/* #57534E — warm gray medium text */
.dark [style*="color: rgb(87, 83, 78)"],
.dark [style*="color:#57534E"],
.dark [style*="color: #57534E"],
.dark [style*="color: rgb(107, 114, 128)"],
.dark [style*="color:#6B7280"],
.dark [style*="color: #6B7280"] {
  color: #b0b0b0 !important;
}
```

**Also fix `SmooqiLogo.tsx` and `Header.tsx` directly** — CSS attribute selectors won't catch React-rendered inline styles reliably in all browsers. For these two files, swap to Tailwind `dark:` classes:

**`components/ui/SmooqiLogo.tsx`:**
```tsx
// Change:
<span style={{ color: '#111827' }}>Sm</span>
// To:
<span className="text-gray-900 dark:text-gray-100">Sm</span>
```

**`components/layout/Header.tsx`** (marketing header, same logo):
```tsx
// Change:
<span style={{ color: '#111827' }}>Sm</span>
// To:
<span className="text-gray-900 dark:text-gray-100">Sm</span>
```

**`components/course/CourseCard.tsx`** — title line:
```tsx
// Change:
style={{ color: '#1C1917', fontFamily: 'var(--font-playfair)' }}
// To:
className="text-gray-900 dark:text-gray-100 text-sm font-bold line-clamp-2 leading-snug flex-1"
style={{ fontFamily: 'var(--font-playfair)' }}
```

For all other files (dashboard components, lesson components, page files) — the CSS attribute selector approach above handles them without touching individual files.
