import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const BoardRoutes = {
  getBoardsByWorkspaceId: {
    path: '/api/board/getBoardsByWorkspaceId/:workspace_id',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,

  createBoard: {
    path: '/api/board/createBoard',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams,

  getBoardInfoByBoardId: {
    path: '/api/board/getBoardInfoByBoardId/:board_id',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,

  changeBoardVisibility: {
    path: '/api/board/changeBoardVisibility',
    method: RequestMethod.PATCH,
    jwtSecure: false
  } as IRouteParams
} as const
