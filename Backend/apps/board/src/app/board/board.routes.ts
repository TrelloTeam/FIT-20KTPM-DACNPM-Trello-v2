import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export const BoardRoutes = {
  getAllBoard: {
    path: '/api/board',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  getBoardsByWorkspaceId: {
    path: '/api/board/:workspace_id',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  createBoard: {
    path: '/api/board/create',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,

  getBoardInfoByBoardId: {
    path: '/api/board/detail/:board_id',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  deleteBoard: {
    path: '/api/board/:board_id',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,

  updateBoard: {
    path: '/api/board/:board_id',
    method: RequestMethod.PATCH,
    jwtSecure: false,
  } as IRouteParams,

  addMember: {
    path: '/api/board/members/add',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,

  removeMember: {
    path: '/api/board/members/remove',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,

  addWatcher: {
    path: '/api/board/watchers/add',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,

  removeWatcher: {
    path: '/api/board/watchers/remove',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,
} as const
