import { RequestMethod } from '@nestjs/common'

export default {
  health: {
    path: '/health',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
}
