import type { Attchment as PrismaAttachment } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment) {
    if (!raw.questionId) {
      throw new Error('Invalid raw data: questionId is missing')
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
