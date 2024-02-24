import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const parsedValue = this.schema.safeParse(value)
    if (parsedValue.success == false)
      throw new BadRequestException(parsedValue.error)
    return parsedValue.data
  }
}
