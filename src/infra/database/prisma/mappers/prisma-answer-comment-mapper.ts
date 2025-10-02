import type { Prisma, Comment as PrismaComment } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment) {
    if (!raw.answerId) {
      throw new Error('Invalid raw data: answerId is missing')
    }

    return AnswerComment.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
