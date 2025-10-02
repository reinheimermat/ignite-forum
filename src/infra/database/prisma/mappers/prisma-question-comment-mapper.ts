import type { Prisma, Comment as PrismaComment } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment) {
    if (!raw.questionId) {
      throw new Error('Invalid raw data: questionId is missing')
    }

    return QuestionComment.create(
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

  static toPrisma(
    questionComment: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}
