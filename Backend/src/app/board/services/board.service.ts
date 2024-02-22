import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model, Types } from 'mongoose'
import * as _ from 'lodash'

export abstract class IBoardService {
  abstract createBoard(
    data: TrelloApi.BoardApi.CreateBoard
  ): Promise<DbSchemas.BoardSchema.Board>

  abstract getAllBoard(): Promise<DbSchemas.BoardSchema.Board[]>
}

export class BoardService implements IBoardService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[1])
    private BoardMModel: Model<DbSchemas.BoardSchema.Board>
  ) {}

  async createBoard(data: TrelloApi.BoardApi.CreateBoard) {
    const model = new this.BoardMModel(data)
    return model.save()
  }

  async getAllBoard() {
    return this.BoardMModel.find().exec()
  }

  async getBoardsByWorkspaceId(
    workspace_id: TrelloApi.BoardApi.getBoardsByWorkspaceIdRequest
  ) {
    return this.BoardMModel.find({ workspace_id: workspace_id }).exec()
  }

  async getBoardInfoByBoardId(
    board_id: TrelloApi.BoardApi.GetBoardInfoByBoardIdRequest
  ) {
    const board = await this.BoardMModel.findById(board_id).exec()
    return new this.BoardMModel(board)
  }

  async updateBoard(
    data: Partial<DbSchemas.BoardSchema.Board> & { _id: string }
  ) {
    if (!Types.ObjectId.isValid(data._id))
      throw new HttpException('Invalid _id', HttpStatus.BAD_REQUEST)

    const filter = { _id: data._id }
    const update: Partial<DbSchemas.BoardSchema.Board> = _.pickBy(
      data,
      _.identity
    )

    const result = await this.BoardMModel.findOneAndUpdate(filter, update, {
      new: true
    })

    return new this.BoardMModel(result)
  }

  async deleteBoard(board_id: TrelloApi.BoardApi.DeleteBoardRequest) {
    const board = await this.BoardMModel.findOneAndDelete({
      _id: board_id
    }).exec()
    return new this.BoardMModel(board)
  }
}

///

export class BoardServiceMock implements IBoardService {
  createBoard(data: TrelloApi.BoardApi.CreateBoard) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      return res({
        ...data,
        _id: 'Mock-id',
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false
      })
    })
  }

  getAllBoard() {
    return new Promise<DbSchemas.BoardSchema.Board[]>((res) => {
      return res([])
    })
  }

  getBoardInfoByBoardId(
    board_id: TrelloApi.BoardApi.GetBoardInfoByBoardIdRequest
  ) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      return res({
        _id: board_id,
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false,
        workspace_id: 'Mock-id',
        name: '',
        visibility: 'private'
      })
    })
  }

  updateBoard(data: DbSchemas.BoardSchema.Board) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      return res({
        ...data
      })
    })
  }

  deleteBoard(board_id: TrelloApi.BoardApi.DeleteBoardRequest) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      return res({
        _id: board_id,
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false,
        workspace_id: 'Mock-id',
        name: '',
        visibility: 'private'
      })
    })
  }
}
