import { randomUUID } from 'node:crypto'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseUrl(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync('pnpm prisma db push --skip-generate')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
