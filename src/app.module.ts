import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from 'src/env'
import { AuthModule } from 'src/infra/http/auth/auth.module'
import { AuthenticateController } from 'src/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from 'src/infra/http/controllers/create-account.controller'
import { PrismaService } from 'src/prisma/prisma.service'
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
