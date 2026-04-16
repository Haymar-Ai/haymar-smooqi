/**
 * Returns the current date/time as seen in Pacific Time (America/Los_Angeles).
 * Handles PST (UTC-8) and PDT (UTC-7) automatically via Intl.
 *
 * Note: the returned Date's wall-clock values (getHours, getDate, etc.)
 * match Pacific Time. Its underlying timestamp is NOT a real UTC instant
 * for the Pacific moment — it should only be used to read wall-clock
 * components, not passed to APIs expecting a UTC instant.
 */
export function getNowInPacific(): Date {
  const now = new Date()

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'

  return new Date(
    parseInt(get('year')),
    parseInt(get('month')) - 1,
    parseInt(get('day')),
    parseInt(get('hour')),
    parseInt(get('minute')),
    parseInt(get('second')),
  )
}

/**
 * Returns midnight of today in Pacific Time as a UTC Date object.
 * Use for DB queries that filter by date.
 *
 * Designed for a UTC-deployed server (e.g. Railway). On machines whose
 * system clock is set to Pacific Time, `new Date(y, m, d, 0, 0, 0)` is
 * already PT midnight as a UTC instant, so the added offset is redundant;
 * this is acceptable for local dev.
 */
export function getTodayPacificMidnightUTC(): Date {
  const pacificNow = getNowInPacific()
  const pacificMidnight = new Date(
    pacificNow.getFullYear(),
    pacificNow.getMonth(),
    pacificNow.getDate(),
    0, 0, 0, 0,
  )

  const offset = getPacificOffsetMs()
  return new Date(pacificMidnight.getTime() + offset)
}

/**
 * Returns the Pacific timezone offset in milliseconds.
 * Handles PST (-8h) and PDT (-7h) automatically.
 */
function getPacificOffsetMs(): number {
  const now = new Date()
  const utcStr = now.toLocaleString('en-US', { timeZone: 'UTC' })
  const ptStr = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  const utcDate = new Date(utcStr)
  const ptDate = new Date(ptStr)
  return utcDate.getTime() - ptDate.getTime()
}

/**
 * Format a date for display using Pacific timezone.
 */
export function formatPacificDate(
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string {
  return date.toLocaleDateString('en-US', {
    ...options,
    timeZone: 'America/Los_Angeles',
  })
}
