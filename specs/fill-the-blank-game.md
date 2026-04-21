# Spec: Replace Clean Write with "Fill the Blank" Game

## Overview
Replace the Clean Write game (slug: `word-hunter`) with a **Fill the Blank** game — mechanically distinct from Communication Sense. Player sees a sentence with one word missing, picks the correct word from 4 options.

---

## 1. DB Update — `prisma/seed.ts`

### 1a. Rename the game record
Find the `word-hunter` upsert in `seedWordGames()` and update:
- `name`: `'Fill the Blank'`
- `description`: `'Complete the sentence by choosing the right word'`
- Keep `slug: 'word-hunter'` unchanged

### 1b. Replace round content
Delete the existing `wordHunterRounds` array entirely. Replace with the array below.

Each round uses this content shape:
```ts
{
  sentence: string        // sentence with "___" as the blank
  options: [string, string, string, string]  // exactly 4 options, A-D
  correctIndex: number    // 0-based index of correct answer
  explanation: string     // one sentence explaining why
}
```

**Round data (25 rounds):**
```ts
const wordHunterRounds = [
  {
    content: {
      sentence: "She spoke with great ___ , choosing each word carefully to avoid offending anyone.",
      options: ["aggression", "diplomacy", "haste", "confusion"],
      correctIndex: 1,
      explanation: "Diplomacy means tactful, careful communication — the other options contradict the context."
    }
  },
  {
    content: {
      sentence: "The new policy will ___ all employees, regardless of their department.",
      options: ["ignore", "affect", "create", "remove"],
      correctIndex: 1,
      explanation: "Affect means to have an impact on — the sentence describes a policy that applies to everyone."
    }
  },
  {
    content: {
      sentence: "A good leader knows how to ___ their team during difficult times.",
      options: ["abandon", "motivate", "confuse", "isolate"],
      correctIndex: 1,
      explanation: "Motivate means to inspire action and keep morale high — essential during difficult periods."
    }
  },
  {
    content: {
      sentence: "The scientist made a ___ discovery that changed our understanding of the universe.",
      options: ["trivial", "groundbreaking", "routine", "delayed"],
      correctIndex: 1,
      explanation: "Groundbreaking means revolutionary or pioneering — fitting for a discovery that changes understanding."
    }
  },
  {
    content: {
      sentence: "To ___ effectively, you must listen as much as you speak.",
      options: ["argue", "communicate", "interrupt", "compete"],
      correctIndex: 1,
      explanation: "Communication is a two-way process — listening is just as important as speaking."
    }
  },
  {
    content: {
      sentence: "The contract was ___ after both parties agreed to the new terms.",
      options: ["cancelled", "amended", "ignored", "printed"],
      correctIndex: 1,
      explanation: "Amended means formally changed or revised — the correct word when updating agreed terms."
    }
  },
  {
    content: {
      sentence: "She felt ___ after finishing the marathon — tired but proud.",
      options: ["energized", "exhausted", "bored", "anxious"],
      correctIndex: 1,
      explanation: "Exhausted means completely drained of energy — consistent with finishing a marathon and feeling tired."
    }
  },
  {
    content: {
      sentence: "The team reached a ___ after weeks of disagreement, finally agreeing on a plan.",
      options: ["conflict", "consensus", "crisis", "competition"],
      correctIndex: 1,
      explanation: "Consensus means general agreement — the result of resolving weeks of disagreement."
    }
  },
  {
    content: {
      sentence: "His ___ approach to problem-solving helped the team find creative solutions.",
      options: ["rigid", "analytical", "careless", "passive"],
      correctIndex: 1,
      explanation: "Analytical means breaking problems into parts to understand them — leads to creative, structured solutions."
    }
  },
  {
    content: {
      sentence: "The company decided to ___ its product line to reach new markets.",
      options: ["reduce", "expand", "copy", "delay"],
      correctIndex: 1,
      explanation: "Expand means to grow or extend — the correct word when a company is reaching new markets."
    }
  },
  {
    content: {
      sentence: "Reading regularly can ___ your vocabulary and improve your writing.",
      options: ["weaken", "enrich", "limit", "replace"],
      correctIndex: 1,
      explanation: "Enrich means to enhance or add value — regular reading adds depth to vocabulary."
    }
  },
  {
    content: {
      sentence: "The professor asked students to ___ their essays before submitting them.",
      options: ["delete", "revise", "forget", "copy"],
      correctIndex: 1,
      explanation: "Revise means to review and improve — standard advice before submitting written work."
    }
  },
  {
    content: {
      sentence: "A ___ mindset helps you grow from failure instead of being defeated by it.",
      options: ["fixed", "growth", "passive", "closed"],
      correctIndex: 1,
      explanation: "A growth mindset, coined by Carol Dweck, means believing abilities can be developed through effort."
    }
  },
  {
    content: {
      sentence: "The new manager worked hard to ___ trust with her team in the first month.",
      options: ["destroy", "build", "avoid", "hide"],
      correctIndex: 1,
      explanation: "Build trust is the standard phrase — establishing confidence through consistent actions."
    }
  },
  {
    content: {
      sentence: "To stay healthy, it's important to ___ a balanced diet and regular exercise.",
      options: ["ignore", "maintain", "replace", "avoid"],
      correctIndex: 1,
      explanation: "Maintain means to keep up consistently — the correct word for sustaining healthy habits."
    }
  },
  {
    content: {
      sentence: "The report was ___ with data that supported the team's conclusions.",
      options: ["empty", "filled", "replaced", "hidden"],
      correctIndex: 1,
      explanation: "Filled with data means packed or loaded — the sentence describes a report rich in supporting evidence."
    }
  },
  {
    content: {
      sentence: "When giving feedback, be ___ and focus on specific behaviors, not personality.",
      options: ["vague", "constructive", "harsh", "silent"],
      correctIndex: 1,
      explanation: "Constructive feedback aims to improve — specific and behavior-focused, not personal attacks."
    }
  },
  {
    content: {
      sentence: "The film received ___ reviews — critics and audiences loved it.",
      options: ["poor", "glowing", "mixed", "delayed"],
      correctIndex: 1,
      explanation: "Glowing reviews means extremely positive — consistent with both critics and audiences loving it."
    }
  },
  {
    content: {
      sentence: "She ___ her idea clearly, making sure everyone in the room understood the plan.",
      options: ["hid", "articulated", "forgot", "copied"],
      correctIndex: 1,
      explanation: "Articulated means expressed clearly and coherently — the right word for clear communication of an idea."
    }
  },
  {
    content: {
      sentence: "The children were ___ to learn that the school trip had been cancelled.",
      options: ["thrilled", "disappointed", "confused", "relieved"],
      correctIndex: 1,
      explanation: "Disappointed is the natural emotional response to a cancellation of something anticipated."
    }
  },
  {
    content: {
      sentence: "Good writing is ___ — every word earns its place.",
      options: ["verbose", "concise", "repetitive", "vague"],
      correctIndex: 1,
      explanation: "Concise means brief and clear — the hallmark of good writing where every word is necessary."
    }
  },
  {
    content: {
      sentence: "The negotiations were ___ , with both sides refusing to compromise.",
      options: ["productive", "tense", "brief", "friendly"],
      correctIndex: 1,
      explanation: "Tense means strained and uneasy — the right word when both sides refuse to compromise."
    }
  },
  {
    content: {
      sentence: "He ___ his mistake immediately and apologized to the team.",
      options: ["denied", "acknowledged", "repeated", "ignored"],
      correctIndex: 1,
      explanation: "Acknowledged means admitted or recognized — followed naturally by an apology."
    }
  },
  {
    content: {
      sentence: "The new law was designed to ___ the rights of all citizens equally.",
      options: ["remove", "protect", "ignore", "limit"],
      correctIndex: 1,
      explanation: "Protect means to safeguard — laws are designed to uphold and defend rights, not remove them."
    }
  },
  {
    content: {
      sentence: "A strong argument is built on ___ evidence, not assumptions.",
      options: ["weak", "credible", "vague", "outdated"],
      correctIndex: 1,
      explanation: "Credible evidence means reliable and trustworthy — the foundation of any strong argument."
    }
  },
]
```

### 1c. Update the createMany call for word-hunter rounds
The existing seed loop for `word-hunter` rounds should use this new array with the new content shape.

---

## 2. New Component — `components/word-games/FillBlank.tsx`

Build a new game component. Props:
```ts
interface Round {
  sentence: string        // contains "___"
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
}

interface Props {
  rounds: Round[]
}
```

**UI:**
- Show sentence with `___` highlighted (bold or colored with `var(--color-primary)`)
- 4 option buttons in a 2×2 grid, labeled A / B / C / D
- On tap: immediately show correct (green) / wrong (red) highlight + explanation text below
- "Next" button appears after answering
- After all rounds: show score summary (X / Y correct) with a "Play Again" button

**Style:** match the existing CommSense component style (card-based, same button styles, same progress indicator pattern).

---

## 3. Wire up in `app/(app)/word-games/[gameSlug]/page.tsx`

In the `word-hunter` branch:
- Map rounds: cast `r.content` to the `FillBlank` round shape
- Render `<FillBlank rounds={mapped} />`
- Remove any leftover CommSense mapping from this branch

Import `FillBlank` from `@/components/word-games/FillBlank`.

---

## 4. Update games list — `app/(app)/word-games/page.tsx`

Update the `word-hunter` entry:
```ts
{
  slug: 'word-hunter',
  name: 'Fill the Blank',
  description: 'Complete the sentence by choosing the right word.',
  icon: '✏️',
  gradient: 'from-violet-500 to-purple-600',
}
```

---

## Constraints
- Do not touch CommSense, WordSearch, or their rounds
- Do not change DB schema
- Do not change API routes or data fetching in the game page
- TypeScript must compile clean
- No layout shift or flicker between rounds

## Verification
- `/word-games/word-hunter` shows Fill the Blank game, not CommSense
- `/word-games/communication-sense` unchanged
- Tapping an option shows feedback immediately
- Score summary appears after all rounds
- Games list shows "Fill the Blank" with ✏️ icon
