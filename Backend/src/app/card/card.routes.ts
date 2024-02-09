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
  } as IRouteParams,
  getCardDetail: {
    path: '/api/card/detail',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  updateCardDetail: {
    path: '/api/card/detail',
    method: RequestMethod.PUT,
    jwtSecure: false
  } as IRouteParams,
  addFeatureToCard: {
    path: '/api/card/feature',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,
  updateFeatureToCard: {
    path: '/api/card/feature',
    method: RequestMethod.PUT,
    jwtSecure: false
  } as IRouteParams
} as const
