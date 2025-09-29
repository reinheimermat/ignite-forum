import { Controller, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/infra/http/auth/guards/jwt-auth.guard'

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {}
