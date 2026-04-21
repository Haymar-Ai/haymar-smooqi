import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const TOPIC_IDS: Record<string,string> = {
  'personal-finance':       'cmo8m8eqy0002p79cob1tfx3e',
  'art-culture':            'cmo8m8ezo0004p79c4ce9h0m0',
  'biology':                'cmo8m8f8t0006p79cfjv57nw1',
  'communication-skills':   'cmo8m8egu0000p79c64adytzb',
  'psychology-mindset':     'cmo8m8elx0001p79cu8dues7f',
  'math-logic':             'cmo8m8fmf0009p79crzb911wt',
  'dog-training':           'cmo8m8fqx000ap79co6zfxfu7',
  'literature':             'cmo8m8fhz0008p79cyxgkpbs3',
  'philosophy':             'cmo8m8evg0003p79cdlzj5e7d',
  'physics':                'cmo8m8fdb0007p79cbpg0gu17',
  'style':                  'cmo8m8fve000bp79c9ukikg9e',
}

const newCourses = [
  { slug: 'credit-and-debt-mastery',      title: 'Credit & Debt Mastery',          topic: 'personal-finance',     level: 'beginner',     description: 'Master credit scores, debt strategies, and financial health.' },
  { slug: 'digital-art-and-design',       title: 'Digital Art & Design',           topic: 'art-culture',          level: 'beginner',     description: 'Explore digital tools, design principles, and creative workflows.' },
  { slug: 'ecology-and-evolution',        title: 'Ecology & Evolution',            topic: 'biology',              level: 'intermediate', description: 'Understand ecosystems, natural selection, and life on Earth.' },
  { slug: 'energy-and-waves',             title: 'Energy & Waves',                 topic: 'physics',              level: 'intermediate', description: 'Discover how energy transfers and waves shape the physical world.' },
  { slug: 'ethics-and-morality',          title: 'Ethics & Morality',              topic: 'philosophy',           level: 'intermediate', description: 'Examine ethical frameworks and moral reasoning in everyday life.' },
  { slug: 'genetics-and-dna',             title: 'Genetics & DNA',                 topic: 'biology',              level: 'intermediate', description: 'Decode the science of heredity, genes, and DNA.' },
  { slug: 'habit-and-behavior-change',    title: 'Habit & Behavior Change',        topic: 'psychology-mindset',   level: 'beginner',     description: 'Build lasting habits using psychology and behavioral science.' },
  { slug: 'logic-and-critical-thinking',  title: 'Logic & Critical Thinking',      topic: 'math-logic',           level: 'intermediate', description: 'Sharpen reasoning skills with logic, fallacies, and argumentation.' },
  { slug: 'obedience-and-socialization',  title: 'Obedience & Socialization',      topic: 'dog-training',         level: 'beginner',     description: 'Train your dog in obedience and proper socialization.' },
  { slug: 'personal-brand-through-style', title: 'Personal Brand Through Style',   topic: 'style',                level: 'beginner',     description: 'Build a distinctive personal brand using fashion and presentation.' },
  { slug: 'poetry-and-language',          title: 'Poetry & Language',              topic: 'literature',           level: 'intermediate', description: 'Explore poetic forms, literary devices, and the power of language.' },
  { slug: 'storytelling-and-narrative',   title: 'Storytelling & Narrative',       topic: 'communication-skills', level: 'intermediate', description: 'Craft compelling stories using narrative structure and technique.' },
]

async function main() {
  for (const c of newCourses) {
    const existing = await prisma.course.findUnique({ where: { slug: c.slug } })
    if (existing) { console.log('  already exists:', c.slug); continue }
    await prisma.course.create({
      data: {
        slug: c.slug,
        title: c.title,
        description: c.description,
        level: c.level,
        lessonCount: 5,
        estimatedMinutes: 50,
        isFree: false,
        sortOrder: 0,
        topicId: TOPIC_IDS[c.topic],
      }
    })
    console.log('  ✓ created:', c.slug)
  }
  console.log('Done.')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
