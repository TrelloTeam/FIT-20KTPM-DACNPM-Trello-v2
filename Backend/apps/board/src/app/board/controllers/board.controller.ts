import * as _ from 'lodash'

import { InjectController, InjectRoute } from '@app/common/decorators'
import { SwaggerApi } from '@app/common/decorators/'
import { IdParamValidationPipe, ZodValidationPipe } from '@app/common/pipes'
import {
  Body,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { getSchemaPath } from '@nestjs/swagger'
import { TrelloApi } from '@trello-v2/shared'

import BoardRoutes from '../board.routes'
import { BoardService } from '../services/board.service'
import { FileInterceptor } from '@nestjs/platform-express/multer'

@InjectController({
  name: BoardRoutes.index,
})
export class BoardController {
  constructor(private boardService: BoardService) {}

  @InjectRoute(BoardRoutes.getAllBoard)
  @SwaggerApi({
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('GetallBoardResponseSchema') },
      },
    ],
  })
  async getAll(): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.boardService.getAllBoard()
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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('GetallBoardResponseSchema') },
      },
    ],
  })
  async getBoardsByWorkSpaceId(
    @Param('workspace_id', IdParamValidationPipe)
    workspace_id: TrelloApi.BoardApi.workSpaceIdRequest,
  ): Promise<TrelloApi.BoardApi.GetallBoardResponse> {
    const data = await this.boardService.getBoardsByWorkspaceId(workspace_id)

    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.createBoard)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('CreateBoardRequestSchema') } },
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('CreateBoardResponseSchema') },
      },
    ],
  })
  async create(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.CreateBoardRequestSchema))
    body: TrelloApi.BoardApi.CreateBoard,
  ): Promise<TrelloApi.BoardApi.CreateBoardResponse> {
    const data = await this.boardService.createBoard(body)
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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('GetBoardInfoByBoardIdResponseSchema') },
      },
    ],
  })
  async getBoardInfoByBoardId(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.BoardIdRequest,
  ): Promise<TrelloApi.BoardApi.GetBoardInfoByBoardIdResponse> {
    const data = await this.boardService.getBoardInfoByBoardId(board_id)

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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('DeleteBoardResponseSchema') },
      },
    ],
  })
  async deleteBoard(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.BoardIdRequest,
  ): Promise<TrelloApi.BoardApi.DeleteBoardResponse> {
    const data = await this.boardService.deleteBoard(board_id)
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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('UpdateBoardResponseSchema') },
      },
    ],
  })
  async updateBoard(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.UpdateBoardRequestSchema))
    body: TrelloApi.BoardApi.UpdateBoardRequest,
  ): Promise<TrelloApi.BoardApi.UpdateBoardResponse> {
    const data = await this.boardService.updateBoard(body)
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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('AddMemberResponseSchema') },
      },
    ],
  })
  async addMember(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.AddMemberRequestSchema))
    body: TrelloApi.BoardApi.AddMemberRequest,
  ): Promise<TrelloApi.BoardApi.AddMemberResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: _.union(board?.members_email, [body.email]) }
    const data = await this.boardService.updateBoard(update)
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
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('RemoveMemberResponseSchema') },
      },
    ],
  })
  async removeMember(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.RemoveMemberRequestSchema))
    body: TrelloApi.BoardApi.RemoveMemberRequest,
  ): Promise<TrelloApi.BoardApi.RemoveMemberResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, members_email: board?.members_email.filter((item) => item !== body.email) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.addWatcher)
  @SwaggerApi({
    body: {
      schema: { $ref: getSchemaPath('AddWatcherRequestSchema') },
    },
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('AddWatcherResponseSchema') },
      },
    ],
  })
  async addWatcher(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.AddWatcherRequestSchema))
    body: TrelloApi.BoardApi.AddWatcherRequest,
  ): Promise<TrelloApi.BoardApi.AddWatcherResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, watcher_email: _.union(board?.watcher_email, [body.email]) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.removeWatcher)
  @SwaggerApi({
    body: {
      schema: { $ref: getSchemaPath('RemoveWatcherRequestSchema') },
    },
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('RemoveWatcherResponseSchema') },
      },
    ],
  })
  async removeWatcher(
    @Body(new ZodValidationPipe(TrelloApi.BoardApi.RemoveWatcherRequestSchema))
    body: TrelloApi.BoardApi.RemoveWatcherRequest,
  ): Promise<TrelloApi.BoardApi.RemoveWatcherResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(body._id)
    const update = { _id: body._id, watcher_email: board?.watcher_email.filter((item) => item !== body.email) }
    const data = await this.boardService.updateBoard(update)
    return {
      data: data,
    }
  }

  @InjectRoute(BoardRoutes.updateBackground)
  @SwaggerApi({
    params: {
      name: 'board_id',
      type: 'string',
      example: 'string',
    },
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('UpdateBoardResponseSchema') },
      },
    ],
  })
  @UseInterceptors(FileInterceptor('background'))
  async updateBackground(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.BoardIdRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 }), new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    background: Express.Multer.File,
  ): Promise<TrelloApi.BoardApi.UpdateBoardResponse> {
    const imageUrl = await this.boardService.uploadFirebaseImage(board_id, background)
    const board = await this.boardService.updateBoard({ _id: board_id, background: imageUrl })

    return {
      data: board,
    }
  }

  @InjectRoute(BoardRoutes.removeBackground)
  @SwaggerApi({
    params: {
      name: 'board_id',
      type: 'string',
      example: 'string',
    },
    responses: [
      {
        status: HttpStatus.OK,
        schema: { $ref: getSchemaPath('UpdateBoardResponseSchema') },
      },
    ],
  })
  async removeBackground(
    @Param('board_id', IdParamValidationPipe)
    board_id: TrelloApi.BoardApi.BoardIdRequest,
  ): Promise<TrelloApi.BoardApi.UpdateBoardResponse> {
    const board = await this.boardService.getBoardInfoByBoardId(board_id)
    if (board.background) await this.boardService.removeFirebaseImage(board.background)
    const update = await this.boardService.updateBoard({ _id: board._id, background: '' })

    return {
      data: update,
    }
  }
}
