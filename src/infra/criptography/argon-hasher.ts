import { hash, verify } from 'argon2'
import type { HasherComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import type { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class ArgonHasher implements HasherGenerator, HasherComparer {
  hash(plain: string): Promise<string> {
    return hash(plain)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return verify(plain, hash)
  }
}
