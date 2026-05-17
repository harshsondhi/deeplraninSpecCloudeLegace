'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Option = { id: string; name: string }

export default function BookPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [agents, setAgents] = useState<Option[]>([])
  const [ailments, setAilments] = useState<Option[]>([])
  const [therapies, setTherapies] = useState<Option[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/agents').then((r) => r.json()),
      fetch('/api/ailments').then((r) => r.json()),
      fetch('/api/therapies').then((r) => r.json()),
    ]).then(([a, ai, th]) => {
      setAgents(a)
      setAilments(ai)
      setTherapies(th)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLSelectElement | HTMLInputElement)
        .value

    const data = {
      agentId: getValue('agentId'),
      ailmentId: getValue('ailmentId'),
      therapyId: getValue('therapyId'),
      date: getValue('date'),
    }

    const newErrors: Record<string, string> = {}
    if (!data.agentId) newErrors.agentId = 'Please select an agent'
    if (!data.ailmentId) newErrors.ailmentId = 'Please select an ailment'
    if (!data.therapyId) newErrors.therapyId = 'Please select a therapy'
    if (!data.date) newErrors.date = 'Please choose a date'
    else if (new Date(data.date) <= new Date())
      newErrors.date = 'Date must be in the future'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSubmitting(false)

    if (res.ok) {
      const appt = await res.json()
      router.push(`/agents/${appt.agent.id}/dashboard`)
    } else {
      const err = await res.json()
      setErrors({ form: err.error ?? 'Something went wrong' })
    }
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <div className="container" style={{ paddingBlock: '2rem', maxWidth: '640px' }}>
      <hgroup>
        <h1>Book a Session</h1>
        <p>Select your agent, their ailment, a therapy, and a time that works.</p>
      </hgroup>

      {errors.form && (
        <p aria-live="polite" style={{ color: 'var(--pico-del-color)' }}>
          {errors.form}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Agent
          <select name="agentId" defaultValue={searchParams.get('agentId') ?? ''} aria-invalid={!!errors.agentId}>
            <option value="">— select an agent —</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          {errors.agentId && <small>{errors.agentId}</small>}
        </label>

        <label>
          Ailment
          <select name="ailmentId" aria-invalid={!!errors.ailmentId}>
            <option value="">— select an ailment —</option>
            {ailments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          {errors.ailmentId && <small>{errors.ailmentId}</small>}
        </label>

        <label>
          Therapy
          <select name="therapyId" defaultValue={searchParams.get('therapyId') ?? ''} aria-invalid={!!errors.therapyId}>
            <option value="">— select a therapy —</option>
            {therapies.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.therapyId && <small>{errors.therapyId}</small>}
        </label>

        <label>
          Session date
          <input
            name="date"
            type="date"
            min={minDateStr}
            aria-invalid={!!errors.date}
          />
          {errors.date && <small>{errors.date}</small>}
        </label>

        <button type="submit" aria-busy={submitting} disabled={submitting}>
          {submitting ? 'Booking…' : 'Book Session'}
        </button>
      </form>
    </div>
  )
}
