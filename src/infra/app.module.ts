import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/infra/auth/auth.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { envSchema } from '@/infra/env'
import { HttpModule } from '@/infra/http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
