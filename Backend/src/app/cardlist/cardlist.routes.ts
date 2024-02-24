import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const CardlistRoutes = {
  getAllCardlistApi: {
    path: '/api/cardlist',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  createCardlistApi: {
    path: '/api/cardlist',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams
} as const
