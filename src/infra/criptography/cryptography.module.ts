import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HasherComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { ArgonHasher } from '@/infra/criptography/argon-hasher'
import { JwtEncrypter } from '@/infra/criptography/jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HasherGenerator, useClass: ArgonHasher },
    { provide: HasherComparer, useClass: ArgonHasher },
  ],
  exports: [Encrypter, HasherGenerator, HasherComparer],
})
export class CryptographyModule {}
