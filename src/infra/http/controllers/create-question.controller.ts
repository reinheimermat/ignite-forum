import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import z from 'zod'
import { CurrentUser } from '@/infra/auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '@/infra/auth/guards/jwt-auth.guard'
import type { UserPayload } from '@/infra/auth/strategies/jwt-strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/controllers/pipes/zod-validation-pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

export type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBody,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug: 'asd',
      },
    })

    return {
      title,
      content,
      userId,
    }
  }
}
