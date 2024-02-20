import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model, Types } from 'mongoose'

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

  async getBoardsByWorkspaceId(workspace_id: string) {
    return this.BoardMModel.find({ workspace_id: workspace_id }).exec()
  }

  async getBoardInfoByBoardId(board_id: string) {
    if (!Types.ObjectId.isValid(board_id))
      throw new HttpException('Invalid board_id', HttpStatus.BAD_REQUEST)

    const board = await this.BoardMModel.findById(board_id).exec()
    return new this.BoardMModel(board)
  }
}

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

  getBoardsByWorkSpaceId() {
    return new Promise<DbSchemas.BoardSchema.Board[]>((res) => {
      return res([])
    })
  }
}
