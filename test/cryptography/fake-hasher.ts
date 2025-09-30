import type { HasherComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import type { HasherGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HasherGenerator, HasherComparer {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return hashed === `hashed-${plain}`
  }

  async hash(plain: string): Promise<string> {
    return `hashed-${plain}`
  }
}
