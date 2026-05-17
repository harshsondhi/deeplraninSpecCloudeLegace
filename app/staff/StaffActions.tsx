'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function StaffActions({
  appointmentId,
  status,
}: {
  appointmentId: string
  status: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    setLoading(true)
    await fetch(`/api/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setLoading(false)
    router.refresh()
  }

  if (status === 'cancelled') return <span>—</span>

  return (
    <span style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {status !== 'confirmed' && (
        <button
          onClick={() => updateStatus('confirmed')}
          disabled={loading}
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
        >
          Confirm
        </button>
      )}
      <button
        onClick={() => updateStatus('cancelled')}
        disabled={loading}
        className="secondary"
        style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
      >
        Cancel
      </button>
    </span>
  )
}
