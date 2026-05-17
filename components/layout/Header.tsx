import Link from 'next/link'
import { getSession } from '@/lib/auth'
import LogoutButton from './LogoutButton'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="site-header">
      <Link href="/" className="site-header__brand">AgenticClinic</Link>
      <nav className="site-header__nav" aria-label="Main navigation">
        <Link href="/agents">Agents</Link>
        <Link href="/therapies">Therapies</Link>
        <Link href="/book">Book a Session</Link>
        {session.isLoggedIn ? (
          <>
            <Link href="/staff">Staff</Link>
            <LogoutButton />
          </>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </nav>
    </header>
  )
}
