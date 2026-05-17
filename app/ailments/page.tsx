import { db } from '@/lib/db'

export default async function AilmentsPage() {
  const ailments = await db.ailment.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <hgroup>
        <h1>Ailments Catalog</h1>
        <p>Do any of these sound familiar? You are not alone.</p>
      </hgroup>
      <div className="grid">
        {ailments.map((ailment) => (
          <article key={ailment.id}>
            <h3>{ailment.name}</h3>
            <p>{ailment.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
