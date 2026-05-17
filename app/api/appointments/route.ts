import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const appointments = await db.appointment.findMany({
    include: { agent: true, ailment: true, therapy: true },
    orderBy: { date: 'asc' },
  })
  return NextResponse.json(appointments)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { agentId, ailmentId, therapyId, date } = body

  if (!agentId || !ailmentId || !therapyId || !date) {
    return NextResponse.json(
      { error: 'agentId, ailmentId, therapyId, and date are required' },
      { status: 400 },
    )
  }

  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
    return NextResponse.json(
      { error: 'date must be a valid date in the future' },
      { status: 400 },
    )
  }

  const appointment = await db.appointment.create({
    data: { agentId, ailmentId, therapyId, date: parsedDate },
    include: { agent: true },
  })
  return NextResponse.json(appointment, { status: 201 })
}
