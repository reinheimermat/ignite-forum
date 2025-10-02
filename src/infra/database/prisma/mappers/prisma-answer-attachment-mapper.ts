import type { Attchment as PrismaAttachment } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment) {
    if (!raw.answerId) {
      throw new Error('Invalid raw data: answerId is missing')
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
