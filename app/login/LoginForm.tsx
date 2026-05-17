'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    setSubmitting(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setSubmitting(false)

    if (res.ok) {
      router.push(redirectTo)
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Login failed')
    }
  }

  return (
    <div className="container" style={{ paddingBlock: '2rem', maxWidth: '480px' }}>
      <hgroup>
        <h1>Sign in</h1>
        <p>Staff and admin access.</p>
      </hgroup>

      {error && (
        <p aria-live="polite" style={{ color: 'var(--pico-del-color)' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button type="submit" aria-busy={submitting} disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        No account? <Link href="/register">Register</Link>
      </p>
    </div>
  )
}
