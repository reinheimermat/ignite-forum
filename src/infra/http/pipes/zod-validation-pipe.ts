import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, type ZodObject } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          errors: fromZodError(error),
        })
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
