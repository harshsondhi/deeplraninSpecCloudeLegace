import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const therapies = await db.therapy.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(therapies)
}
