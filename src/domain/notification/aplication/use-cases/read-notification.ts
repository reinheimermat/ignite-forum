import { type Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import type { NotificationsRepository } from '@/domain/notification/aplication/repositories/notifications-repository'
import type { Notification } from '@/domain/notification/enterprise/entities/notification'

interface ReadNotificationServiceRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationServiceResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationService {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationServiceRequest): Promise<ReadNotificationServiceResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.create(notification)

    return right({
      notification,
    })
  }
}
