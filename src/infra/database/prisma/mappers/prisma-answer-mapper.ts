import type { Prisma, Answer as PrismaAnswer } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer) {
    return Answer.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        questionId: new UniqueEntityId(raw.questionId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      questionId: answer.questionId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    }
  }
}
