import type { Prisma, User as PrismaStudent } from 'generated/prisma'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'

// biome-ignore lint/complexity/noStaticOnlyClass: <false>
export class PrismaStudentMapper {
  static toDomain(raw: PrismaStudent) {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
