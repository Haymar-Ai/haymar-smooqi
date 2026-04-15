export function getXpForLevel(level: number): number {
  let total = 0
  for (let i = 1; i < level; i++) {
    total += i * 50
  }
  return total
}

export function getLevelFromXp(xp: number): number {
  let level = 1
  while (getXpForLevel(level + 1) <= xp) level++
  return level
}
