import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const CardlistRoutes = {
  getAllCardlistApi: {
    path: '/api/cardlist',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  createCardlistApi: {
    path: '/api/cardlist/create',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,
  updateCardlists: {
    path: '/api/cardlist/update',
    method: RequestMethod.PUT,
    jwtSecure: false
  } as IRouteParams,
  moveCardlists: {
    path: '/api/cardlist/move',
    method: RequestMethod.PUT,
    jwtSecure: false
  } as IRouteParams,
  copyCardlistApi: {
    path: '/api/cardlist/copy',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,
  getCardlistsByBoardId: {
    path: '/api/cardlist_by_board/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  sortCardlistsByOldestDate: {
    path: '/api/sort_oldest_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  sortCardlistsByNewestDate: {
    path: '/api/sort_newest_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,
  sortCardlistsByName: {
    path: '/api/sort_name_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams
} as const
