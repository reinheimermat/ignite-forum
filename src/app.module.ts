import { Module } from '@nestjs/common'
import { CreateAccountController } from 'src/infra/http/controllers/create-account.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
