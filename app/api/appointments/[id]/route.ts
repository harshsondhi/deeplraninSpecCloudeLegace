import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { status } = await req.json()

  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const appointment = await db.appointment.update({
    where: { id },
    data: { status },
    include: { agent: true, ailment: true, therapy: true },
  })
  return NextResponse.json(appointment)
}
