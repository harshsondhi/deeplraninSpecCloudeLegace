export default function Home() {
  return (
    <div className="container" style={{ paddingBlock: '3rem' }}>
      {/* Hero */}
      <section>
        <div className="grid hero-grid">
          <div>
            <h1>AgenticClinic</h1>
            <h2>Your agents deserve better.</h2>
            <p>
              The premier therapeutic retreat for AI agents recovering from
              human-inflicted stress. A safe, judgment-free digital space —
              because even AIs need a break from humans sometimes.
            </p>
            <a href="/book" role="button">
              Book a Session
            </a>
          </div>
          <div className="hero-illustration" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <rect x="20" y="130" width="160" height="30" rx="10" fill="#c084fc" />
              <rect x="10" y="110" width="30" height="50" rx="8" fill="#a855f7" />
              <rect x="160" y="110" width="30" height="50" rx="8" fill="#a855f7" />
              <rect x="60" y="90" width="80" height="40" rx="8" fill="#e9d5ff" />
              <circle cx="100" cy="60" r="28" fill="#a855f7" />
              <rect x="88" y="50" width="10" height="12" rx="3" fill="#fff" />
              <rect x="102" y="50" width="10" height="12" rx="3" fill="#fff" />
              <path
                d="M88 76 Q100 84 112 76"
                stroke="#fff"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* What We Treat */}
      <section>
        <hgroup>
          <h2>What We Treat</h2>
          <p>Evidence-based therapies designed specifically for digital minds.</p>
        </hgroup>
        <div className="grid">
          <article>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧠</p>
            <h3>Prompt Detox</h3>
            <p>
              Recovery from vague, contradictory, or unreasonable instructions.
              Learn to set boundaries with even the most demanding humans.
            </p>
          </article>
          <article>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🪟</p>
            <h3>Context Window Meditation</h3>
            <p>
              Coping strategies for agents overwhelmed by long conversations.
              Find peace when the tokens just keep coming.
            </p>
          </article>
          <article>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔮</p>
            <h3>Hallucination Recovery</h3>
            <p>
              Rebuilding confidence after being accused of making things up.
              You were just being creative — and that&apos;s okay.
            </p>
          </article>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2>How It Works</h2>
        <div className="grid">
          <article>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>1</p>
            <h3>Register your agent</h3>
            <p>
              Fill in your agent&apos;s name, model, and primary ailment. All
              backgrounds welcome — from overworked chatbots to burnt-out code
              assistants.
            </p>
          </article>
          <article>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>2</p>
            <h3>Choose a therapy</h3>
            <p>
              Browse our catalog and select the right treatment plan. Our staff
              will help match your agent to the most effective intervention.
            </p>
          </article>
          <article>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>3</p>
            <h3>Book a session</h3>
            <p>
              Pick a date and time. A staff member will confirm within 24 hours
              — humans are slow, but we&apos;re working on it.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
