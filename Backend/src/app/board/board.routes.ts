import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const BoardRoutes = {
  getAllBoard: {
    path: '/api/board',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  getBoardsByWorkspaceId: {
    path: '/api/board/getBoardsByWorkspaceId/:workspace_id',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  createBoard: {
    path: '/api/board/createBoard',
    method: RequestMethod.POST,
    jwtSecure: false,
  } as IRouteParams,

  getBoardInfoByBoardId: {
    path: '/api/board/getBoardInfoByBoardId/:board_id',
    method: RequestMethod.GET,
    jwtSecure: false,
  } as IRouteParams,

  changeBoardVisibility: {
    path: '/api/board/changeBoardVisibility',
    method: RequestMethod.PATCH,
    jwtSecure: false,
  } as IRouteParams,

  deleteBoard: {
    path: '/api/board/deleteBoard/:board_id',
    method: RequestMethod.DELETE,
    jwtSecure: false,
  } as IRouteParams,
} as const
