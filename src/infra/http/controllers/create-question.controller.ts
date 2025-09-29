import { Controller, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/infra/http/auth/decorators/current-user.decorator'
import { JwtAuthGuard } from 'src/infra/http/auth/guards/jwt-auth.guard'
import type { UserPayload } from 'src/infra/http/auth/strategies/jwt-strategy'

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user.sub)
  }
}
