import { db } from '@/lib/db'
import StaffActions from './StaffActions'

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>
}) {
  const { pw } = await searchParams
  const staffPassword = process.env.STAFF_PASSWORD ?? 'staff'

  if (pw !== staffPassword) {
    return (
      <div className="container" style={{ paddingBlock: '2rem', maxWidth: '480px' }}>
        <h1>Staff Dashboard</h1>
        <p>Enter the staff password to continue.</p>
        <form method="GET">
          <label>
            Password
            <input name="pw" type="password" autoComplete="current-password" />
          </label>
          <button type="submit">Enter</button>
        </form>
      </div>
    )
  }

  const [appointments, agents] = await Promise.all([
    db.appointment.findMany({
      include: { agent: true, ailment: true, therapy: true },
      orderBy: { date: 'asc' },
    }),
    db.agent.findMany(),
  ])

  const now = new Date()
  const upcoming = appointments.filter((a) => new Date(a.date) >= now)
  const thisWeek = upcoming.filter((a) => {
    const diff = new Date(a.date).getTime() - now.getTime()
    return diff < 7 * 24 * 60 * 60 * 1000
  })

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <h1>Staff Dashboard</h1>

      <div className="grid" style={{ marginBottom: '2rem' }}>
        <article>
          <strong style={{ fontSize: '2rem' }}>{agents.length}</strong>
          <p>Registered agents</p>
        </article>
        <article>
          <strong style={{ fontSize: '2rem' }}>{appointments.length}</strong>
          <p>Total appointments</p>
        </article>
        <article>
          <strong style={{ fontSize: '2rem' }}>{thisWeek.length}</strong>
          <p>This week</p>
        </article>
      </div>

      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <figure>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Agent</th>
                <th>Ailment</th>
                <th>Therapy</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>{appt.agent.name}</td>
                  <td>{appt.ailment.name}</td>
                  <td>{appt.therapy.name}</td>
                  <td>{appt.status}</td>
                  <td>
                    <StaffActions appointmentId={appt.id} status={appt.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )}
    </div>
  )
}
