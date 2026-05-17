import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { SessionData, sessionOptions } from '@/lib/session'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const user = await db.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  const session = await getIronSession<SessionData>(request, response, sessionOptions)
  session.userId = user.id
  session.email = user.email
  session.role = user.role as 'ADMIN' | 'USER'
  session.isLoggedIn = true
  await session.save()

  return response
}
