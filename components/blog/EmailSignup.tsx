'use client'
import { useState } from 'react'
import { themeConfig } from '@/lib/theme'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // Store in DB via API route
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="mt-4 text-sm font-medium text-white">You&apos;re in! See you Tuesday.</p>
  }

  const isVB = themeConfig.isVB
  const buttonTextColor = isVB ? '#1A6B4A' : '#6D28D9'
  const inputRadius = isVB ? '8px' : '12px'

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="flex-1 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white"
        style={{ borderRadius: inputRadius }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-white px-6 py-2.5 text-sm font-semibold hover:bg-white/90 transition disabled:opacity-60"
        style={{ borderRadius: inputRadius, color: buttonTextColor }}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-xs text-red-300 mt-1 w-full text-center">Something went wrong. Try again.</p>}
    </form>
  )
}
