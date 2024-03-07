import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export const CardRoutes = {
  createCard: {
    path: '/api/card',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  getAllCardsOfCardlist: {
    path: '/api/card',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  getCardDetail: {
    path: '/api/card/detail',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  updateCardDetail: {
    path: '/api/card/detail',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
  addFeatureToCard: {
    path: '/api/card/feature',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  updateFeatureToCard: {
    path: '/api/card/feature',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
  addWatcherToCard: {
    path: '/api/card/watcher',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  deleteWatcherToCard: {
    path: '/api/card/watcher',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,
  archiveCard: {
    path: '/api/card/archive',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  unarchiveCard: {
    path: '/api/card/archive',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,
  moveCard: {
    path: '/api/card/move/same',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
} as const
