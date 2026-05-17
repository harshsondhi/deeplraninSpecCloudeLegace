import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <h2>Agent not found.</h2>
      <p>This agent may have recovered and checked out. Or never existed.</p>
      <Link href="/agents">Back to all agents</Link>
    </div>
  )
}
