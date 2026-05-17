import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const agents = await db.agent.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(agents)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, model, description } = body

  if (!name?.trim() || !model?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: 'name, model, and description are required' },
      { status: 400 },
    )
  }

  const agent = await db.agent.create({ data: { name, model, description } })
  return NextResponse.json(agent, { status: 201 })
}
