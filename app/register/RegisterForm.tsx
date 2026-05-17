'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
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
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setSubmitting(false)

    if (res.ok) {
      router.push('/login')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Registration failed')
    }
  }

  return (
    <div className="container" style={{ paddingBlock: '2rem', maxWidth: '480px' }}>
      <hgroup>
        <h1>Register</h1>
        <p>Create an account to access AgentClinic.</p>
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
          <input name="password" type="password" autoComplete="new-password" required minLength={8} />
          <small>Minimum 8 characters</small>
        </label>
        <button type="submit" aria-busy={submitting} disabled={submitting}>
          {submitting ? 'Registering…' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </div>
  )
}
