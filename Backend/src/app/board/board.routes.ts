import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const BoardRoutes = {
  getAllBoard: {
    path: '/api/board',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,

  getBoardsByWorkspaceId: {
    path: '/api/board/getBoardsByWorkspaceId/:workspace_id',
    method: RequestMethod.GET,
    jwtSecure: false
  } as IRouteParams,

  createBoard: {
    path: '/api/board/createBoard',
    method: RequestMethod.POST,
    jwtSecure: false
  } as IRouteParams
} as const
