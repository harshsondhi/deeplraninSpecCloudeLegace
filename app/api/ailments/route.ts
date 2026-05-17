import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const ailments = await db.ailment.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(ailments)
}
