import { Gender, UserRole } from '@app/common/common/enums'

import { enumh } from '../helpers'

const GENDER = enumh.convertToRegex<typeof Gender>(Gender)

const USER_ROLE = enumh.convertToRegex<typeof UserRole>(UserRole)

const BOD = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i

export default {
  BOD,
  GENDER,
  USER_ROLE,
}
