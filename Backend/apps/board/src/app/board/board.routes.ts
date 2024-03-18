import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export default {
  index: '/api/board',
  getAllBoard: {
    path: '/',
    method: RequestMethod.GET,
  } as IRouteParams,

  getBoardsByWorkspaceId: {
    path: '/workspace/:workspace_id',
    method: RequestMethod.GET,
  } as IRouteParams,

  createBoard: {
    path: '/',
    method: RequestMethod.POST,
  } as IRouteParams,

  getBoardInfoByBoardId: {
    path: '/:board_id',
    method: RequestMethod.GET,
  } as IRouteParams,

  deleteBoard: {
    path: '/:board_id',
    method: RequestMethod.DELETE,
  } as IRouteParams,

  updateBoard: {
    path: '/',
    method: RequestMethod.PATCH,
  } as IRouteParams,

  addMember: {
    path: '/members/add',
    method: RequestMethod.POST,
  } as IRouteParams,

  removeMember: {
    path: '/members/remove',
    method: RequestMethod.POST,
  } as IRouteParams,

  addWatcher: {
    path: '/watchers/add',
    method: RequestMethod.POST,
  } as IRouteParams,

  removeWatcher: {
    path: '/watchers/remove',
    method: RequestMethod.POST,
  } as IRouteParams,

  updateBackground: {
    path: '/:board_id/background',
    method: RequestMethod.PATCH,
  } as IRouteParams,

  removeBackground: {
    path: '/:board_id/background',
    method: RequestMethod.DELETE,
  } as IRouteParams,
} as const
