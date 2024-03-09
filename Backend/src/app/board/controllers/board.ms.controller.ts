import { InjectController } from '@/decorators'
import { IdParamValidationPipe, ZodValidationPipe } from '@/pipes'
import { Body, Param } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { TrelloApi } from '@trello-v2/shared'

import { BoardService } from '../services/board.service'

@InjectController({
  name: 'board',
  isCore: true,
})
export class BoardMSController {
  constructor(private BoardService: BoardService) {}

  @GrpcMethod('BoardService', 'getAll')
  async getAll(): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.BoardService.getAllBoard()
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'getBoardsByWorkSpaceId')
  async getBoardsByWorkSpaceId(
    @Param('workspace_id', IdParamValidationPipe)
    workspace_id: TrelloApi.BoardApi.getBoardsByWorkspaceIdRequest,
  ): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.BoardService.getBoardsByWorkspaceId(workspace_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'create')
  async create(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.CreateBoardRequestSchema))
    body: TrelloApi.BoardApi.CreateBoard,
  ): Promise<TrelloApi.BoardApi.CreateBoardResponse> {
    const data = await this.BoardService.createBoard(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'getBoardInfoByBoardId')
  async getBoardInfoByBoardId(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.GetBoardInfoByBoardIdRequest,
  ): Promise<TrelloApi.BoardApi.GetBoardInfoByBoardIdResponse | unknown> {
    const data = await this.BoardService.getBoardInfoByBoardId(board_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'changeBoardVisibility')
  async changeBoardVisibility(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.ChangeBoardVisibilityRequestSchema))
    body: TrelloApi.BoardApi.ChangeBoardVisibilityRequest,
  ): Promise<TrelloApi.BoardApi.ChangeBoardVisibilityResponse | unknown> {
    const data = await this.BoardService.updateBoard(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'deleteBoard')
  async deleteBoard(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.DeleteBoardRequest,
  ): Promise<TrelloApi.BoardApi.DeleteBoardResponse | unknown> {
    const data = await this.BoardService.deleteBoard(board_id)
    return {
      data: data,
    }
  }
}
