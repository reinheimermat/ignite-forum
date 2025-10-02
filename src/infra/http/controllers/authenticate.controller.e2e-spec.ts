import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'argon2'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Authenticate Controller (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hash('password123'),
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'john@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
