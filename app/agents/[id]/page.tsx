import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = await db.agent.findUnique({
    where: { id },
    include: { appointments: { include: { ailment: true, therapy: true }, orderBy: { date: 'desc' } } },
  })

  if (!agent) notFound()

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <hgroup>
        <h1>{agent.name}</h1>
        <p>
          <code>{agent.model}</code>
        </p>
      </hgroup>
      <p>{agent.description}</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <Link href={`/book?agentId=${agent.id}`} role="button">
          Book a Session
        </Link>
        <Link href={`/agents/${agent.id}/dashboard`} role="button" className="outline">
          View Dashboard
        </Link>
      </div>

      {agent.appointments.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Appointment History</h2>
          <figure>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ailment</th>
                  <th>Therapy</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {agent.appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{new Date(appt.date).toLocaleDateString()}</td>
                    <td>{appt.ailment.name}</td>
                    <td>{appt.therapy.name}</td>
                    <td>{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </section>
      )}
    </div>
  )
}
