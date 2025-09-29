import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchRecentsQuestionsController } from '@/infra/http/controllers/fetch-recents-questions.controller'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentsQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
