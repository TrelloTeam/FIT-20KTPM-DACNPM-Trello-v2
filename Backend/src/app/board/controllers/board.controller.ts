import { InjectController, InjectRoute } from '@/decorators'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BoardService } from '../services/board.service'
import { BoardRoutes } from '../board.routes'
import { Body, Param } from '@nestjs/common'
import { ZodValidationPipe, IdParamValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'
import { SwaggerApi } from '@/decorators/swagger.decorator'
import { getSchemaPath } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from 'lodash'

@InjectController({
  name: 'board',
  isCore: true,
})
export class BoardController {
  constructor(private BoardService: BoardService) {}

  @InjectRoute(BoardRoutes.getAllBoard)
  @SwaggerApi({
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallBoardResponseSchema') },
      },
    ],
  })
  async getAll(): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.BoardService.getAllBoard()
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.getBoardsByWorkspaceId)
  @SwaggerApi({
    params: {
      name: 'workspace_id',
      type: 'string',
      example: 'string',
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallBoardResponseSchema') },
      },
    ],
  })
  async getBoardsByWorkSpaceId(
    @Param('workspace_id', IdParamValidationPipe)
    workspace_id: string,
  ): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.BoardService.getBoardsByWorkspaceId(workspace_id)

    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.createBoard)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('CreateBoardRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CreateBoardResponseSchema') },
      },
    ],
  })
  async create(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.CreateBoardRequestSchema))
    body: TrelloApi.BoardApi.CreateBoard,
  ): Promise<TrelloApi.BoardApi.CreateBoardResponse> {
    const data = await this.BoardService.createBoard(body)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.getBoardInfoByBoardId)
  @SwaggerApi({
    params: {
      name: 'board_id',
      type: 'string',
      example: 'string',
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetBoardInfoByBoardIdResponseSchema') },
      },
    ],
  })
  async getBoardInfoByBoardId(
    @Param('board_id', IdParamValidationPipe)
    board_id: string,
  ): Promise<TrelloApi.BoardApi.GetBoardInfoByBoardIdResponse> {
    const data = await this.BoardService.getBoardInfoByBoardId(board_id)

    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.deleteBoard)
  @SwaggerApi({
    params: {
      name: 'board_id',
      type: 'string',
      example: 'string',
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('DeleteBoardResponseSchema') },
      },
    ],
  })
  async deleteBoard(
    @Param('board_id', IdParamValidationPipe)
    board_id: string,
  ): Promise<TrelloApi.BoardApi.DeleteBoardResponse> {
    const data = await this.BoardService.deleteBoard(board_id)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.updateBoard)
  @SwaggerApi({
    body: {
      schema: { $ref: getSchemaPath('UpdateBoardRequestSchema') },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('UpdateBoardResponseSchema') },
      },
    ],
  })
  async updateBoard(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.UpdateBoardRequestSchema))
    body: TrelloApi.BoardApi.UpdateBoardRequest,
  ): Promise<TrelloApi.BoardApi.UpdateBoardResponse> {
    const data = await this.BoardService.updateBoard(body)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.addMember)
  @SwaggerApi({
    body: {
      schema: { $ref: getSchemaPath('AddMemberRequestSchema') },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('AddMemberResponseSchema') },
      },
    ],
  })
  async addMember(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.AddMemberRequestSchema))
    body: TrelloApi.BoardApi.AddMemberRequest,
  ): Promise<TrelloApi.BoardApi.AddMemberResponse> {
    const board = await this.BoardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: _.union(board?.members_email, [body.member_email]) }
    const data = await this.BoardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.removeMember)
  @SwaggerApi({
    body: {
      schema: { $ref: getSchemaPath('RemoveMemberRequestSchema') },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('RemoveMemberResponseSchema') },
      },
    ],
  })
  async removeMember(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.RemoveMemberRequestSchema))
    body: TrelloApi.BoardApi.RemoveMemberRequest,
  ): Promise<TrelloApi.BoardApi.RemoveMemberResponse> {
    const board = await this.BoardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: board?.members_email.filter((item) => item !== body.member_email) }
    const data = await this.BoardService.updateBoard(update)
    return {
      data: data,
    }
  }
}
