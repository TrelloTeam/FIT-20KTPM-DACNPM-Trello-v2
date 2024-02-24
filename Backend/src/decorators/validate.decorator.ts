import { Matches } from 'class-validator'

import { Regex } from '@/utils/constants'
import { applyDecorators } from '@nestjs/common'

export function IsOnlyDate() {
  return applyDecorators(
    Matches(Regex.BOD, {
      message: '$property must be formatted as yyyy-mm-dd.'
    })
  )
}

export function IsValidGender() {
  return applyDecorators(
    Matches(Regex.GENDER, 'i', {
      message: `$property must match ${Regex.GENDER}.`
    })
  )
}

export function IsValidUserRole() {
  return applyDecorators(
    Matches(Regex.USER_ROLE, 'i', {
      message: `$property must match ${Regex.USER_ROLE}.`
    })
  )
}
