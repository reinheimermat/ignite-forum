import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthenticateController } from 'src/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from 'src/infra/http/controllers/create-account.controller'
import { AuthModule } from '@/infra/auth/auth.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { envSchema } from '@/infra/env'
import { CreateQuestionController } from '@/infra/http/controllers/create-question.controller'
import { FetchRecentsQuestionsController } from '@/infra/http/controllers/fetch-recents-questions.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentsQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
