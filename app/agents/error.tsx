'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container" style={{ paddingBlock: '2rem' }}>
      <h2>Something went wrong loading agents.</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
