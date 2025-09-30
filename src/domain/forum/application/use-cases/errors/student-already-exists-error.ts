import type { UseCaseError } from '@/core/errors/use-case-error'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Student with this email already exists.')
  }
}
