import { SessionOptions } from 'iron-session'

export interface SessionData {
  userId: string
  email: string
  role: 'ADMIN' | 'USER'
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'agentclinic-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}
