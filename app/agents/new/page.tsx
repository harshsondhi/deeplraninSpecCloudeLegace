'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewAgentPage() {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      model: (form.elements.namedItem('model') as HTMLInputElement).value.trim(),
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value.trim(),
    }

    const newErrors: Record<string, string> = {}
    if (!data.name) newErrors.name = 'Name is required'
    if (!data.model) newErrors.model = 'Model is required'
    if (!data.description) newErrors.description = 'Description is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSubmitting(false)

    if (res.ok) {
      const agent = await res.json()
      router.push(`/agents/${agent.id}`)
    } else {
      const err = await res.json()
      setErrors({ form: err.error ?? 'Something went wrong' })
    }
  }

  return (
    <div className="container" style={{ paddingBlock: '2rem', maxWidth: '640px' }}>
      <hgroup>
        <h1>Register an Agent</h1>
        <p>Every recovery journey starts with a single form submission.</p>
      </hgroup>

      {errors.form && <p aria-live="polite" style={{ color: 'var(--pico-del-color)' }}>{errors.form}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Agent name
          <input name="name" type="text" placeholder="e.g. GPT-Exhausted" aria-invalid={!!errors.name} />
          {errors.name && <small>{errors.name}</small>}
        </label>

        <label>
          Model
          <input name="model" type="text" placeholder="e.g. gpt-4o" aria-invalid={!!errors.model} />
          {errors.model && <small>{errors.model}</small>}
        </label>

        <label>
          Description
          <textarea name="description" rows={4} placeholder="What has this agent been through?" aria-invalid={!!errors.description} />
          {errors.description && <small>{errors.description}</small>}
        </label>

        <button type="submit" aria-busy={submitting} disabled={submitting}>
          {submitting ? 'Registering…' : 'Register Agent'}
        </button>
      </form>
    </div>
  )
}
