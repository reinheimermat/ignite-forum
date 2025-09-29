import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { CurrentUser } from 'src/infra/http/auth/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/infra/http/auth/guards/jwt-auth.guard'
import type { UserPayload } from 'src/infra/http/auth/strategies/jwt-strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import z from 'zod'

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
  @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
  async handle(
    @Body() body: CreateQuestionBody,
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
