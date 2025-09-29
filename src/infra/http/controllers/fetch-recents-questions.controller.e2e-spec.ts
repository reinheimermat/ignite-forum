import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'

describe('Fetch Recent Questions (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    })

    const accessToken = await jwt.signAsync({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Question 1',
          slug: 'question-1',
          content: 'Content 1',
          authorId: user.id,
        },
        {
          title: 'Question 2',
          slug: 'question-2',
          content: 'Content 2',
          authorId: user.id,
        },
        {
          title: 'Question 3',
          slug: 'question-3',
          content: 'Content 3',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200)
    expect(response.body.questions).toHaveLength(3)
  })
})
