import { themeConfig } from '@/lib/theme'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const bg = themeConfig.isVB ? '#FAFAF6' : 'var(--color-primary-light)'
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: bg }}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
