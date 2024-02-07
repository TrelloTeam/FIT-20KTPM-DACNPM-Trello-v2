import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const CardRoutes = {
  createCard: {
    path: '/api/card',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,
  getAllCardsOfCardlist: {
    path: '/api/card',
    method: RequestMethod.GET,
    jwtSecure: false
  }
} as const
