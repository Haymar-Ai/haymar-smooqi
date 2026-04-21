# Spec: Restore Pre-Migration Polish — Lesson, Quiz, Animations, Word Games

## Context
Several components were over-engineered during mobile optimization and lost their polish. This spec restores them to the pre-migration quality (commit 9ba87e4) while keeping the genuinely new additions (quiz shuffle, CourseComplete, scroll-to-top, dark mode, etc.).

---

## File 1 — `components/lesson/LessonPlayer.tsx`

**Restore the original layout structure** (no sticky top/bottom, natural flow):

```tsx
return (
  <div className="min-h-screen flex flex-col">
    <main
      className="flex-1 px-4 py-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {state.phase === 'slides' && (
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={state.currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* slide content */}
            </motion.div>
          </AnimatePresence>

          {/* Progress bar — below slide, not fixed */}
          <div className="max-w-[680px] mx-auto mt-6">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
                initial={false}
                animate={{ width: `${((state.currentSlide + 1) / totalSlides) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Toggle + Navigation — below progress bar, natural flow */}
          <div className="max-w-[680px] mx-auto mt-6">
            <div className="flex justify-center mb-4">
              <div className="flex bg-gray-100 rounded-full p-0.5">
                <button onClick={() => toggleMode('read')} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', state.mode === 'read' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}>
                  Read
                </button>
                <button onClick={() => toggleMode('audio')} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', state.mode === 'audio' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}>
                  Audio
                </button>
              </div>
            </div>

            {state.mode === 'read' && (
              <div className="flex justify-between">
                <Button variant="ghost" onClick={prevSlide} disabled={state.currentSlide === 0} className="text-gray-500">
                  ← Previous
                </Button>
                <Button onClick={nextSlide} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', borderRadius: 'var(--button-radius)' }}>
                  {state.currentSlide === totalSlides - 1 ? 'Complete Lesson' : 'Next →'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  </div>
)
```

**Restore slide animation variants** to the simple pixel-based original:
```ts
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
}
```

**Keep these additions from today** — do not remove:
- `useEffect` that calls `window.scrollTo({ top: 0, behavior: 'instant' })` on `state.phase` and `state.currentSlide` change
- CourseComplete phase logic and `<CourseComplete>` render
- Quiz shuffle in `QuizQuestion.tsx`
- `isLastLessonInCourse` check and `course_complete` + `+50 XP` API calls

**Remove**: sticky top bar, sticky bottom bar, `overflow-hidden` wrapper on AnimatePresence, `safe-area-bottom` class on nav, `mode="popLayout"`, spring transition on slides.

---

## File 2 — `components/lesson/SlideView.tsx`

Restore vA card padding from `p-4 sm:p-8` back to `p-8`:

```tsx
<Card className={cn(
  'max-w-[680px] mx-auto bg-white',
  'p-8',
  themeConfig.isVA ? 'rounded-[16px] shadow-lg border-0' : 'rounded-[12px] border'
)}>
```

---

## File 3 — `components/lesson/QuizQuestion.tsx`

**Keep the shuffle logic** (`useMemo` with Fisher-Yates) — this is good new value.

**Restore the original vA option layout** (was clean and polished):

```tsx
// vA options
<div className="space-y-3">
  {shuffled.entries.map(({ text }, index) => {
    const key = OPTION_KEYS[index]
    return (
      <button
        key={key}
        onClick={() => handleSelect(key)}
        disabled={showFeedback}
        className={cn(
          'w-full text-left p-4 rounded-xl transition-all flex items-center gap-3',
          getOptionStyles(key)  // uses shuffled.correctKey internally
        )}
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
          {key}
        </span>
        <span className="flex-1 text-gray-800">{text}</span>
        {showFeedback && key === shuffled.correctKey && <span className="text-lg">✅</span>}
        {showFeedback && key === selected && key !== shuffled.correctKey && <span className="text-lg">❌</span>}
      </button>
    )
  })}
</div>
```

`getOptionStyles` must use `shuffled.correctKey` not `question.correctAnswer`.

Restore explanation block:
```tsx
<div className="mt-4 p-4 bg-blue-50 rounded-xl text-sm text-gray-700">
  <span className="font-semibold">Explanation: </span>
  {question.explanation}
</div>
```

Restore "Next Question" / "See Results" button:
```tsx
<div className="mt-6 flex justify-center">
  <Button onClick={handleNext} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', borderRadius: 'var(--button-radius)' }}>
    {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
  </Button>
</div>
```

---

## File 4 — `components/ui/BackButton.tsx`

Restore original logic (history first, href as fallback):
```tsx
function handleBack() {
  if (window.history.length > 1) {
    router.back()
  } else if (href) {
    router.push(href)
  } else {
    router.push('/home')
  }
}
```

---

## File 5 — `components/lesson/LessonHeader.tsx`

Remove the word "Back" — keep only the chevron icon:
```tsx
<button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 -ml-1">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
  {/* removed "Back" text */}
</button>
```

---

## File 6 — `components/word-games/GameHeader.tsx`

Restore pre-migration version exactly — dots track score (green when `i < score`), not current round position:

```tsx
{Array.from({ length: totalRounds }).map((_, i) => (
  <motion.div
    key={i}
    initial={false}
    animate={{ scale: i < score ? [1, 1.3, 1] : 1 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'w-3 h-3 rounded-full border-2 transition-colors',
      i < score
        ? themeConfig.isVB ? '' : 'border-green-500 bg-green-500'
        : themeConfig.isVB ? '' : 'border-gray-300 bg-white'
    )}
    style={themeConfig.isVB
      ? i < score
        ? { background: '#1A6B4A', borderColor: '#1A6B4A' }
        : { background: '#FFFFFF', borderColor: '#E8E4DC' }
      : undefined
    }
  />
))}
```

---

## File 7 — `components/word-games/WordSearch.tsx`

Restore pre-migration feedback styling — unselected words fade to gray, not red:

```tsx
className={cn(
  'px-4 py-2 rounded-lg border text-sm font-medium transition-all',
  phase === 'feedback'
    ? isSelected
      ? 'bg-green-100 border-green-400 text-green-800'
      : 'bg-gray-50 border-gray-200 text-gray-400'   // faded, not red
    : isSelected
      ? 'border-2 text-white'
      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 cursor-pointer'
)}
```

---

## Constraints
- Do NOT touch vB layouts (VbLessonShell, vB QuizQuestion branch, VbDashboard)
- Do NOT touch CourseComplete.tsx
- Do NOT touch dark mode, legal pages, referrals, or any API routes
- Do NOT touch the quiz shuffle useMemo logic — keep it, just restore the surrounding layout
- TypeScript must compile clean

## Verification
- Lesson player: natural scrolling layout, no sticky bars
- Slide animation: smooth easeInOut 0.25s horizontal slide
- Slide card: full `p-8` padding — generous and premium feeling
- Quiz options: full-width, single column, letter badge left, clean spacing
- Correct answer highlights green with ✅, wrong highlights red with ❌
- Explanation appears in blue-tinted card below options
- Back button: chevron only, no "Back" text
- BackButton: uses browser history first
- GameHeader dots: track score (green per correct answer)
- WordSearch feedback: missed words fade gray, not red
- No TypeScript errors
