# Spec: Lesson Nav Bar + Quiz Layout Fixes

---

## Fix 1 — Bottom nav bar overtaking slide content on mobile

**File:** `components/lesson/LessonPlayer.tsx`

**Problem:** The sticky bottom bar (Read/Audio toggle + Prev/Next buttons) takes up too much vertical space on short mobile screens, pushing slide content out of view or making it feel cramped.

**Root cause:** The bottom bar has two rows — the Read/Audio toggle row and the Prev/Next row — stacked vertically inside a `py-3` container. On small screens this is ~90px of fixed chrome eating into slide content.

**Fix:**

Collapse the two rows into a single row. Put the Read/Audio toggle on the left, Prev/Next on the right — all in one horizontal line:

```tsx
{/* Fixed bottom: single row — toggle left, nav right */}
<div className="sticky bottom-0 z-10 bg-white/90 backdrop-blur-sm border-t border-gray-100 safe-area-bottom">
  <div className="max-w-[680px] mx-auto px-4 py-2 flex items-center justify-between gap-3">
    
    {/* Read/Audio toggle — left side */}
    <div className="flex bg-gray-100 rounded-full p-0.5 flex-shrink-0">
      <button
        onClick={() => toggleMode('read')}
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
          state.mode === 'read' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
        )}
      >
        Read
      </button>
      <button
        onClick={() => toggleMode('audio')}
        className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
          state.mode === 'audio' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
        )}
      >
        Audio
      </button>
    </div>

    {/* Prev/Next — right side (always visible, not conditional on read mode) */}
    <div className="flex items-center gap-2 flex-shrink-0">
      <Button
        variant="ghost"
        onClick={prevSlide}
        disabled={state.currentSlide === 0}
        className="text-gray-500 h-9 px-3 text-sm"
      >
        ← Prev
      </Button>
      <Button
        onClick={nextSlide}
        className="h-9 px-4 text-sm"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
          borderRadius: 'var(--button-radius)',
        }}
      >
        {state.currentSlide === totalSlides - 1 ? 'Finish' : 'Next →'}
      </Button>
    </div>

  </div>
</div>
```

Key changes:
- Single row instead of two stacked rows — saves ~40px on mobile
- Prev/Next always visible (not hidden in audio mode)
- Shorter button labels ("← Prev", "Next →", "Finish") to fit on one line
- `py-2` instead of `py-3` for tighter padding
- Add `pb-safe` or `safe-area-bottom` class for iPhone home bar clearance (add to `globals.css` if needed: `.safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }`)

---

## Fix 2 — Quiz answer options look unpolished after mobile optimization changes

**File:** `components/lesson/QuizQuestion.tsx` (vA layout only — lines ~189–250)

**Problem:** The shuffled options now render in a different layout that looks less polished. The `w-8 h-8` letter circle + left-aligned text worked well before the shuffle refactor but may now look misaligned or have spacing issues.

**Fix — restore the clean vA quiz layout:**

```tsx
// vA options container
<div className="space-y-3">
  {shuffled.entries.map(({ key, text }, index) => (
    <button
      key={key}
      onClick={() => handleSelect(key)}
      disabled={showFeedback}
      className={cn(
        'w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 border',
        getOptionStyles(key)  // use shuffled.correctKey for comparisons inside getOptionStyles
      )}
    >
      {/* Letter badge */}
      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
        style={{
          backgroundColor: showFeedback
            ? key === shuffled.correctKey
              ? '#DCFCE7'
              : key === selected && key !== shuffled.correctKey
                ? '#FEE2E2'
                : '#F3F4F6'
            : '#F3F4F6',
          color: showFeedback
            ? key === shuffled.correctKey
              ? '#15803D'
              : key === selected && key !== shuffled.correctKey
                ? '#DC2626'
                : '#4B5563'
            : '#4B5563',
        }}
      >
        {OPTION_KEYS[index]}
      </span>

      {/* Option text */}
      <span className="flex-1 text-sm text-gray-800 leading-relaxed">{text}</span>

      {/* Feedback icon */}
      {showFeedback && key === shuffled.correctKey && (
        <span className="text-base flex-shrink-0">✅</span>
      )}
      {showFeedback && key === selected && key !== shuffled.correctKey && (
        <span className="text-base flex-shrink-0">❌</span>
      )}
    </button>
  ))}
</div>
```

Important: `getOptionStyles` must use `shuffled.correctKey` not `question.correctAnswer` for background/border colors. Update accordingly.

The letter shown in the badge should be the **display position letter** (`OPTION_KEYS[index]` = A, B, C, D in order) — not the original key from the shuffle — so labels always read A/B/C/D top-to-bottom regardless of which original option is shuffled there.

**Also ensure:**
- `space-y-3` between options (not a 2-column grid)
- Full-width buttons (`w-full`)
- `p-4` padding inside each button for comfortable touch targets
- Explanation block uses `bg-blue-50 rounded-xl p-4 text-sm text-gray-700` (restore original style)
- "Next Question" / "See Results" button is `mt-6 flex justify-center` with primary color

---

## Constraints
- No changes to vB layout (keep vB quiz and lesson shell unchanged)
- No changes to DB, API routes, auth, middleware, or seed
- No changes to slide content rendering (SlideView)
- TypeScript must compile clean

## Verification
- Bottom nav is a single row on mobile — toggle left, Prev/Next right
- Nav bar height is visibly smaller — slide content has more room
- Quiz options are full-width, single column, with letter badge + clean text alignment
- Correct answer highlights green, wrong answer highlights red
- Explanation block appears below options in blue-tinted card
- No TypeScript errors
