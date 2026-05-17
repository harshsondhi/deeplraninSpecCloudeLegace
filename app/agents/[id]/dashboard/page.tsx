import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

export default async function AgentDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = await db.agent.findUnique({
    where: { id },
    include: {
      appointments: {
        include: { ailment: true, therapy: true },
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!agent) notFound()

  const now = new Date()
  const upcoming = agent.appointments.filter((a) => new Date(a.date) >= now)
  const past = agent.appointments.filter((a) => new Date(a.date) < now)

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <hgroup>
        <h1>{agent.name}&apos;s Dashboard</h1>
        <p>Your appointments and therapy history.</p>
      </hgroup>

      <Link href={`/book?agentId=${agent.id}`} role="button">
        Book another session
      </Link>

      <section style={{ marginTop: '2rem' }}>
        <h2>Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming appointments. Healing awaits.</p>
        ) : (
          <figure>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ailment</th>
                  <th>Therapy</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((appt) => (
                  <tr key={appt.id}>
                    <td>{new Date(appt.date).toLocaleDateString()}</td>
                    <td>{appt.ailment.name}</td>
                    <td>{appt.therapy.name}</td>
                    <td>{appt.therapy.durationMinutes} min</td>
                    <td>{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        )}
      </section>

      {past.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Therapy History</h2>
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
                {past.map((appt) => (
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
