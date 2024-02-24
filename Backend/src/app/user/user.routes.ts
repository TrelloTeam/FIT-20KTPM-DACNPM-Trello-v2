import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const UserRoutes = {
  createUser: {
    path: '/api/user',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,
  getAllUser: {
    path: '/api/user',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  updateUser: {
    path: '/api/user/:id',
    method: RequestMethod.PUT,
    jwtSecure: false
  } as IRouteParams
} as const
