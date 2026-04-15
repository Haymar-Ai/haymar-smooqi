import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AppNav } from '@/components/layout/AppNav'
import { MobileNav } from '@/components/layout/MobileNav'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const user = {
    name: session.user?.name ?? 'User',
    image: session.user?.image ?? undefined,
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--app-background, transparent)' }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-60 md:flex-col">
        <AppNav userName={user.name} userImage={user.image} />
      </aside>

      {/* Mobile header */}
      <div className="md:hidden">
        <MobileNav userName={user.name} userImage={user.image} />
      </div>

      {/* Main content */}
      <main className="md:pl-60">
        <div className="px-4 py-6 md:px-8 md:py-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom tab bar is rendered inside MobileNav as fixed bottom */}
    </div>
  )
}
