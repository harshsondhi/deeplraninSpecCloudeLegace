import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="site-header__brand">AgenticClinic</Link>
      <nav className="site-header__nav" aria-label="Main navigation">
        <Link href="/agents">Agents</Link>
        <Link href="/therapies">Therapies</Link>
        <Link href="/book">Book a Session</Link>
      </nav>
    </header>
  )
}
