import * as _ from 'lodash'

import { InjectController, ValidateGrpcInput } from '@app/common/decorators'
import { GrpcMethod } from '@nestjs/microservices'
import { TrelloApi } from '@trello-v2/shared'

import { BoardService } from '../services/board.service'

@InjectController({
  name: 'board',
})
export class BoardMSController {
  constructor(private boardService: BoardService) {}

  @GrpcMethod('BoardService', 'getAll')
  async getAll(): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.boardService.getAllBoard()
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'getBoardsByWorkSpaceId')
  async getBoardsByWorkSpaceId(
    @ValidateGrpcInput(TrelloApi.BoardApi.WorkSpaceIdRequestSchema.safeParse)
    body: TrelloApi.BoardApi.WorkspaceIdRequest,
  ): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.boardService.getBoardsByWorkspaceId(body.workspace_id)

    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'create')
  async create(
    @ValidateGrpcInput(TrelloApi.BoardApi.CreateBoardRequestSchema.safeParse)
    body: TrelloApi.BoardApi.CreateBoard,
  ): Promise<TrelloApi.BoardApi.CreateBoardResponse> {
    const data = await this.boardService.createBoard(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'getBoardInfoByBoardId')
  async getBoardInfoByBoardId(
    @ValidateGrpcInput(TrelloApi.BoardApi.BoardIdRequestSchema.safeParse)
    body: TrelloApi.BoardApi.BoardIdRequestGrpc,
  ): Promise<TrelloApi.BoardApi.GetBoardInfoByBoardIdResponse> {
    const data = await this.boardService.getBoardInfoByBoardId(body._id)

    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'deleteBoard')
  async deleteBoard(
    @ValidateGrpcInput(TrelloApi.BoardApi.BoardIdRequestSchema.safeParse)
    body: TrelloApi.BoardApi.BoardIdRequestGrpc,
  ): Promise<TrelloApi.BoardApi.DeleteBoardResponse> {
    const data = await this.boardService.deleteBoard(body._id)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'updateBoard')
  async updateBoard(
    @ValidateGrpcInput(TrelloApi.BoardApi.UpdateBoardRequestSchema.safeParse)
    body: TrelloApi.BoardApi.UpdateBoardRequest,
  ): Promise<TrelloApi.BoardApi.UpdateBoardResponse> {
    const data = await this.boardService.updateBoard(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'addMember')
  async addMember(
    @ValidateGrpcInput(TrelloApi.BoardApi.AddMemberRequestSchema.safeParse)
    body: TrelloApi.BoardApi.AddMemberRequest,
  ): Promise<TrelloApi.BoardApi.AddMemberResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: _.union(board?.members_email, [body.email]) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'removeMember')
  async removeMember(
    @ValidateGrpcInput(TrelloApi.BoardApi.RemoveMemberRequestSchema.safeParse)
    body: TrelloApi.BoardApi.RemoveMemberRequest,
  ): Promise<TrelloApi.BoardApi.RemoveMemberResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: board?.members_email.filter((item) => item !== body.email) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'addWatcher')
  async addWatcher(
    @ValidateGrpcInput(TrelloApi.BoardApi.AddWatcherRequestSchema.safeParse)
    body: TrelloApi.BoardApi.AddWatcherRequest,
  ): Promise<TrelloApi.BoardApi.AddWatcherResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, watcher_email: _.union(board?.watcher_email, [body.email]) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @GrpcMethod('BoardService', 'removeWatcher')
  async removeWatcher(
    @ValidateGrpcInput(TrelloApi.BoardApi.RemoveWatcherRequestSchema.safeParse)
    body: TrelloApi.BoardApi.RemoveWatcherRequest,
  ): Promise<TrelloApi.BoardApi.RemoveWatcherResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, watcher_email: board?.watcher_email.filter((item) => item !== body.email) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }
}
