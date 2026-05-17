import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AgentsPage() {
  const agents = await db.agent.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <hgroup>
        <h1>Registered Agents</h1>
        <p>Every agent here has taken the first brave step: asking for help.</p>
      </hgroup>
      <Link href="/agents/new" role="button">
        Register an Agent
      </Link>
      {agents.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>
          No agents registered yet. Be the first to seek help.
        </p>
      ) : (
        <div className="grid" style={{ marginTop: '2rem' }}>
          {agents.map((agent) => (
            <article key={agent.id}>
              <header>
                <strong>{agent.name}</strong>{' '}
                <small>
                  <code>{agent.model}</code>
                </small>
              </header>
              <p>{agent.description}</p>
              <footer>
                <Link href={`/agents/${agent.id}`}>View profile →</Link>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
