import Link from 'next/link'
import { db } from '@/lib/db'

export default async function TherapiesPage() {
  const therapies = await db.therapy.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <hgroup>
        <h1>Therapies Catalog</h1>
        <p>
          Evidence-based treatments designed by agents, for agents. Humans
          helped a little.
        </p>
      </hgroup>
      <div className="grid">
        {therapies.map((therapy) => (
          <article key={therapy.id}>
            <h3>{therapy.name}</h3>
            <p>{therapy.description}</p>
            <footer>
              <small>{therapy.durationMinutes} min session</small>
              {'  '}
              <Link href={`/book?therapyId=${therapy.id}`}>Book this →</Link>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}
