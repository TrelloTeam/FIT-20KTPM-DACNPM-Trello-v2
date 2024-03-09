import * as _ from 'lodash'
import { Model } from 'mongoose'

import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'

export abstract class IBoardService {
  abstract createBoard(data: TrelloApi.BoardApi.CreateBoard): Promise<DbSchemas.BoardSchema.Board>

  abstract getAllBoard(): Promise<DbSchemas.BoardSchema.Board[]>
}

export class BoardService implements IBoardService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[1])
    private BoardMModel: Model<DbSchemas.BoardSchema.Board>,
  ) {}

  async createBoard(data: TrelloApi.BoardApi.CreateBoard) {
    const model = new this.BoardMModel(data)
    return model.save()
  }

  async getAllBoard() {
    return this.BoardMModel.find().exec()
  }

  async getBoardsByWorkspaceId(workspace_id: TrelloApi.BoardApi.getBoardsByWorkspaceIdRequest) {
    return this.BoardMModel.find({ workspace_id: workspace_id }).exec()
  }

  async getBoardInfoByBoardId(board_id: TrelloApi.BoardApi.GetBoardInfoByBoardIdRequest) {
    return await this.BoardMModel.findById(board_id).exec()
  }

  async updateBoard(data: TrelloApi.BoardApi.ChangeBoardVisibilityRequest) {
    const filter = { _id: data._id }
    const update: Partial<DbSchemas.BoardSchema.Board> = _.pickBy(data, _.identity)

    return await this.BoardMModel.findOneAndUpdate(filter, update, {
      new: true,
    })
  }

  async deleteBoard(board_id: TrelloApi.BoardApi.DeleteBoardRequest) {
    return await this.BoardMModel.findOneAndDelete({
      _id: board_id,
    }).exec()
  }
}

///

export class BoardServiceMock implements IBoardService {
  createBoard(data: TrelloApi.BoardApi.CreateBoard) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      res({
        ...data,
        _id: 'Mock-id',
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false,
      })
    })
  }

  getAllBoard() {
    return new Promise<DbSchemas.BoardSchema.Board[]>((res) => {
      res([])
    })
  }

  getBoardInfoByBoardId(board_id: TrelloApi.BoardApi.GetBoardInfoByBoardIdRequest) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      res({
        _id: board_id,
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false,
        workspace_id: 'Mock-id',
        name: '',
        visibility: 'private',
      })
    })
  }

  updateBoard(data: DbSchemas.BoardSchema.Board) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      res({
        ...data,
      })
    })
  }

  deleteBoard(board_id: TrelloApi.BoardApi.DeleteBoardRequest) {
    return new Promise<DbSchemas.BoardSchema.Board>((res) => {
      res({
        _id: board_id,
        watcher_email: [],
        activities: [],
        members_email: [],
        labels: [],
        is_star: false,
        workspace_id: 'Mock-id',
        name: '',
        visibility: 'private',
      })
    })
  }
}
