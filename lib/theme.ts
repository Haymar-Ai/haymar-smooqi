const VARIANT = process.env.NEXT_PUBLIC_THEME_VARIANT ?? 'vA'

const VA_TOPIC_COLORS: Record<string, { bg: string; text: string }> = {
  'communication-skills': { bg: '#F3F0FF', text: '#7C3AED' },
  'psychology-mindset': { bg: '#FFF1F3', text: '#E11D48' },
  'personal-finance': { bg: '#F0FDF4', text: '#059669' },
  'philosophy': { bg: '#EFF6FF', text: '#2563EB' },
  'art-culture': { bg: '#FFF7ED', text: '#EA580C' },
  'movie-knowledge': { bg: '#FEF2F2', text: '#DC2626' },
  'biology': { bg: '#F0FDFA', text: '#0D9488' },
  'physics': { bg: '#EEF2FF', text: '#4F46E5' },
  'literature': { bg: '#FFFBEB', text: '#D97706' },
  'math-logic': { bg: '#ECFEFF', text: '#0891B2' },
  'dog-training': { bg: '#FFF7ED', text: '#C2410C' },
  'style': { bg: '#FDF2F8', text: '#C026D3' },
  'voice': { bg: '#F5F3FF', text: '#7C3AED' },
  'intelligence-training': { bg: '#FEFCE8', text: '#CA8A04' },
  'confident-parenting': { bg: '#F0FDF4', text: '#16A34A' },
}

const VB_TOPIC_COLORS: Record<string, { bg: string; text: string }> = {
  'communication-skills': { bg: '#F5F0E8', text: '#C2410C' },
  'psychology-mindset': { bg: '#FDE8E8', text: '#9B1C31' },
  'personal-finance': { bg: '#E8F5E8', text: '#166534' },
  'philosophy': { bg: '#FFF8F0', text: '#78350F' },
  'art-culture': { bg: '#FFF0E0', text: '#9A3412' },
  'movie-knowledge': { bg: '#F0EDED', text: '#374151' },
  'biology': { bg: '#E8F0E8', text: '#166534' },
  'physics': { bg: '#E0F0FF', text: '#1E3A5F' },
  'literature': { bg: '#F5F0E0', text: '#78350F' },
  'math-logic': { bg: '#F0E8F5', text: '#475569' },
  'dog-training': { bg: '#F5EDE0', text: '#78350F' },
  'style': { bg: '#FDE8F0', text: '#A21CAF' },
  'voice': { bg: '#F0E8F5', text: '#6B21A8' },
  'intelligence-training': { bg: '#FFF8E0', text: '#92400E' },
  'confident-parenting': { bg: '#E0F5E8', text: '#166534' },
}

export const themeConfig = {
  variant: VARIANT as 'vA' | 'vB',
  isVA: VARIANT === 'vA',
  isVB: VARIANT === 'vB',
  colors: VARIANT === 'vA' ? {
    primary: '#7C3AED',
    primaryLight: '#EDE9FE',
    background: 'gradient-mesh',
    cardBg: '#FFFFFF',
    cardRadius: '16px',
    buttonRadius: '24px',
    fontHeading: 'Inter',
    fontBody: 'Inter',
  } : {
    primary: '#F97316',
    primaryLight: '#FFF7ED',
    background: '#FAFAF7',
    cardBg: '#FFFFFF',
    cardRadius: '12px',
    buttonRadius: '20px',
    fontHeading: 'Nunito',
    fontBody: 'Inter',
  },
  topicColors: VARIANT === 'vA' ? VA_TOPIC_COLORS : VB_TOPIC_COLORS,
}

export function getThemeCSSVars(): string {
  if (VARIANT === 'vA') {
    return `
      --color-primary: #7C3AED;
      --color-primary-light: #EDE9FE;
      --color-primary-foreground: #FFFFFF;
      --color-background: transparent;
      --card-radius: 16px;
      --button-radius: 24px;
      --font-heading: 'Inter', sans-serif;
    `
  }
  return `
    --color-primary: #F97316;
    --color-primary-light: #FFF7ED;
    --color-primary-foreground: #FFFFFF;
    --color-background: #FAFAF7;
    --card-radius: 12px;
    --button-radius: 20px;
    --font-heading: 'Nunito', sans-serif;
  `
}

export function getBodyStyle(): string {
  if (VARIANT === 'vA') {
    return 'background: linear-gradient(135deg, #EEF2FF 0%, #F5F0FF 30%, #F0FDFA 70%, #FFF1F2 100%); min-height: 100vh;'
  }
  return 'background-color: #FAFAF7; min-height: 100vh;'
}
