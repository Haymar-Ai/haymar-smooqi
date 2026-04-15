import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import { getThemeCSSVars, getBodyStyle } from '@/lib/theme'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Smooqi — Learn Anything, One Lesson at a Time',
  description: 'One lesson a day across 195+ topics. Build real knowledge, one bite at a time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const themeVars = getThemeCSSVars()
  const bodyStyle = getBodyStyle()

  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { ${themeVars} }` }} />
      </head>
      <body
        className="antialiased font-sans"
        style={{ cssText: bodyStyle } as React.CSSProperties & { cssText: string }}
      >
        {children}
      </body>
    </html>
  )
}
