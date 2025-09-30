import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { UserPayload } from '@/infra/auth/strategies/jwt-strategy'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request: { user: UserPayload } = context.switchToHttp().getRequest()

    return request.user
  },
)
