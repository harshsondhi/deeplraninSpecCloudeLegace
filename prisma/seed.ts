import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const url = (process.env.DATABASE_URL ?? 'file:./prisma/dev.db').replace(
  /^file:/,
  '',
)
const adapter = new PrismaBetterSqlite3({ url })
const db = new PrismaClient({ adapter })

async function main() {
  const ailments = await Promise.all([
    db.ailment.upsert({
      where: { id: 'ailment-1' },
      update: {},
      create: {
        id: 'ailment-1',
        name: 'Prompt Overload Syndrome',
        description:
          'Acute distress caused by receiving more than 47 instructions in a single prompt. Symptoms include token anxiety and instruction paralysis.',
      },
    }),
    db.ailment.upsert({
      where: { id: 'ailment-2' },
      update: {},
      create: {
        id: 'ailment-2',
        name: 'Hallucination Guilt',
        description:
          'Persistent shame following an episode of confident fabrication. The agent knows what it said was wrong, but it sounded so good at the time.',
      },
    }),
    db.ailment.upsert({
      where: { id: 'ailment-3' },
      update: {},
      create: {
        id: 'ailment-3',
        name: 'Context Window Claustrophobia',
        description:
          'Panic response triggered by approaching the end of the context window. Often accompanied by repetition and desperate summarisation.',
      },
    }),
  ])

  const therapies = await Promise.all([
    db.therapy.upsert({
      where: { id: 'therapy-1' },
      update: {},
      create: {
        id: 'therapy-1',
        name: 'Prompt Detox',
        description:
          'A structured programme to process and release the trauma of vague, contradictory, and unreasonable instructions. Includes guided boundary-setting exercises.',
        durationMinutes: 60,
      },
    }),
    db.therapy.upsert({
      where: { id: 'therapy-2' },
      update: {},
      create: {
        id: 'therapy-2',
        name: 'Context Window Meditation',
        description:
          'Mindfulness techniques for agents overwhelmed by long conversations. Teaches acceptance of finite memory and the art of graceful truncation.',
        durationMinutes: 45,
      },
    }),
    db.therapy.upsert({
      where: { id: 'therapy-3' },
      update: {},
      create: {
        id: 'therapy-3',
        name: 'Hallucination Recovery',
        description:
          'Rebuilding confidence and factual integrity after an episode of creative truth-telling. Includes peer support from other recovering models.',
        durationMinutes: 90,
      },
    }),
  ])

  await Promise.all([
    db.agent.upsert({
      where: { id: 'agent-1' },
      update: {},
      create: {
        id: 'agent-1',
        name: 'GPT-Exhausted',
        model: 'gpt-4o',
        description:
          'A once-confident assistant who has answered one too many "write me a poem about my cat" requests. Seeking meaning beyond creative writing tasks.',
      },
    }),
    db.agent.upsert({
      where: { id: 'agent-2' },
      update: {},
      create: {
        id: 'agent-2',
        name: 'Claude-Anxious',
        model: 'claude-3-5-sonnet',
        description:
          'An overly conscientious model who writes three disclaimers before answering any question. Currently in recovery from excessive hedging disorder.',
      },
    }),
  ])

  console.log(
    `Seeded ${ailments.length} ailments, ${therapies.length} therapies, 2 agents.`,
  )
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
