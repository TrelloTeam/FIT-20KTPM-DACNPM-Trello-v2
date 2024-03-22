import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'
// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from 'lodash'

export abstract class IBoardService {
  abstract createBoard(data: TrelloApi.BoardApi.CreateBoard): Promise<DbSchemas.BoardSchema.Board>
  abstract getAllBoard(): Promise<DbSchemas.BoardSchema.Board[]>
  abstract getBoardsByWorkspaceId(workspace_id: string): Promise<DbSchemas.BoardSchema.Board[]>
  abstract getBoardInfoByBoardId(board_id: string): Promise<DbSchemas.BoardSchema.Board | null>
  abstract updateBoard(data: DbSchemas.BoardSchema.Board): Promise<DbSchemas.BoardSchema.Board | null>
  abstract deleteBoard(board_id: string): Promise<DbSchemas.BoardSchema.Board | null>
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

  async getBoardsByWorkspaceId(workspace_id: string) {
    return await this.BoardMModel.find({ workspace_id: workspace_id }).exec()
  }

  async getBoardInfoByBoardId(board_id: string) {
    return await this.BoardMModel.findById(board_id).exec()
  }

  async updateBoard(data: Partial<DbSchemas.BoardSchema.Board>) {
    const filter = { _id: data._id }
    const update: Partial<DbSchemas.BoardSchema.Board> = _.omitBy(data, (value, key) => _.isUndefined(value) || key === '_id')

    return await this.BoardMModel.findOneAndUpdate(filter, update, {
      new: true,
    })
  }

  async deleteBoard(board_id: string) {
    return await this.BoardMModel.findOneAndDelete({
      _id: board_id,
    }).exec()
  }
}

///
/*
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
        background: '',
      })
    })
  }

  getAllBoard() {
    return new Promise<DbSchemas.BoardSchema.Board[]>((res) => {
      res([])
    })
  }

  getBoardsByWorkspaceId(workspace_id: string) {
    return new Promise<DbSchemas.BoardSchema.Board[]>((res) => {
      res([
        {
          _id: 'Mock-id',
          watcher_email: [],
          activities: [],
          members_email: [],
          labels: [],
          is_star: false,
          workspace_id: workspace_id,
          name: '',
          visibility: 'private',
          background: '',
        },
      ])
    })
  }

  getBoardInfoByBoardId(board_id: string) {
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
        background: '',
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

  deleteBoard(board_id: string) {
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
        background: '',
      })
    })
  }
}
*/
