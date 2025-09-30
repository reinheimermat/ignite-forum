import { Module } from '@nestjs/common'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { DatabaseModule } from '@/infra/database/database.module'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchRecentsQuestionsController } from '@/infra/http/controllers/fetch-recents-questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentsQuestionsController,
  ],
  providers: [CreateQuestionUseCase],
})
export class HttpModule {}
