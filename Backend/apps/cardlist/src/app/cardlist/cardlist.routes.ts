import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export const CardlistRoutes = {
  getAllCardlistApi: {
    path: '/api/cardlist',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  createCardlistApi: {
    path: '/api/cardlist/create',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  updateCardlists: {
    path: '/api/cardlist/update',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
  moveCardlists: {
    path: '/api/cardlist/move',
    method: RequestMethod.PUT,
    jwtSecure: false,
  } as IRouteParams,
  copyCardlistApi: {
    path: '/api/cardlist/copy',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  getCardlistsByBoardId: {
    path: '/api/cardlist/cardlist_by_board/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  getCardlistsArchivedByBoardId: {
    path: '/api/cardlist/cardlist_archived_by_board/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  getCardlistsNonArchivedByBoardId: {
    path: '/api/cardlist/cardlist_non_archived_by_board/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  sortCardlistsByOldestDate: {
    path: '/api/cardlist/sort_oldest_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  sortCardlistsByNewestDate: {
    path: '/api/cardlist/sort_newest_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  sortCardlistsByName: {
    path: '/api/cardlist/sort_name_cardlist/:boardId',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,
  archiveCardsInList: {
    path: '/api/cardlist/archive_cards_in_list/:cardlistId',
    method: RequestMethod.PATCH,
    jwtSecure: false,
  } as IRouteParams,
  archiveCardList: {
    path: '/api/cardlist/archive_card_list/:cardlistId',
    method: RequestMethod.PATCH,
    jwtSecure: false,
  } as IRouteParams,
  addWatcher: {
    path: '/api/cardlist/add_watcher',
    method: RequestMethod.PATCH,
    jwtSecure: false,
  } as IRouteParams,
  addCardTolist: {
    path: '/api/cardlist/add_card',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
  testRoute: {
    path: '/api/cardlist/test',
    method: RequestMethod.GET,
  } as IRouteParams,
} as const
