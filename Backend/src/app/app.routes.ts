import { RequestMethod } from '@nestjs/common'

export default {
  health: {
    path: '/health',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
  testApi: {
    path: '/api/test',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
  testUi: {
    path: '/ui/test',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
  testAuthApi: {
    path: '/api/test/auth',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
}
