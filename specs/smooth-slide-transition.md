# Spec: Smoother Lesson Slide Transitions

## File
`components/lesson/LessonPlayer.tsx`

## Current State
```ts
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
}
// transition={{ duration: 0.25, ease: 'easeInOut' }}
```

## Problem
Hard pixel offset + linear easing feels rigid and mechanical.

## Fix
Replace `slideVariants` and `transition` with:

```ts
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.97 }),
}
```

```ts
transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.8 }}
```

- Use `%` offsets so it scales with container width
- Spring physics replaces duration/easing — feels natural, not mechanical
- Slight scale breathes life into the transition without being distracting

## Constraints
- Only change `slideVariants` and the `transition` prop on the `motion.div`
- No other changes
- TypeScript must compile clean
