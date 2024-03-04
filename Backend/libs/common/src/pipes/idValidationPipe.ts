import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class IdParamValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid id')
    }
    return value
  }
}

@Injectable()
export class IdBodyValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!Types.ObjectId.isValid(value?._id)) {
      throw new BadRequestException('Invalid id')
    }
    return value
  }
}
