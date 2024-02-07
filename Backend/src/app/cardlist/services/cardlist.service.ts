import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'

export abstract class ICardlistService {
  abstract createCardlist(
    data: TrelloApi.CardlistApi.CreateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>

  abstract copyCardlist(
    data: TrelloApi.CardlistApi.CopyCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>

  abstract getAllCardlist(): Promise<DbSchemas.CardlistSchema.CardList[]>

  abstract getAllCardlistByBoardId(
    board_id: string
  ): Promise<DbSchemas.CardlistSchema.CardList[]>
}

export class CardlistService implements ICardlistService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>,
    @InjectModel(DbSchemas.COLLECTION_NAMES[1])
    private BoardMModel: Model<DbSchemas.BoardSchema.Board>
  ) {}

  async createCardlist(
    data: TrelloApi.CardlistApi.CreateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const board = await this.BoardMModel.findById(data.board_id)
    if (!board) {
      // throw new NotFoundError('Board not found')
      return { status: 'Not Found', msg: "Can't find cardlist" } as any
    }
    data.archive_at = null
    data.created_at = new Date()
    const model = new this.CardlistMModel(data)

    return model.save()
  }

  async copyCardlist(
    data: TrelloApi.CardlistApi.CopyCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const existingCardList = await this.CardlistMModel.findById(data._id)
    if (!existingCardList) {
      return { status: 'Not Found', msg: "Can't find any cardlist" } as any
    }
    const newCardList = new this.CardlistMModel({
      name: existingCardList.name,
      board_id: existingCardList.board_id,
      cards: existingCardList.cards,
      watcher_email: existingCardList.watcher_email,
      index: existingCardList.index,
      archive_at: null
    })
    return newCardList.save()
  }

  async updateCardlist(
    data: TrelloApi.CardlistApi.UpdateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList> {
    const cardlist = await this.CardlistMModel.findById(data._id)
    if (!cardlist) {
      return { status: 'Not Found', msg: "Can't find any cardlist" } as any
    }
    if (data.name) {
      cardlist.name = data.name
    }
    if (data.archive_at) {
      cardlist.archive_at = data.archive_at
    }
    if (data.index) {
      cardlist.index = data.index
    }
    return cardlist.save()
  }
  async getAllCardlist() {
    return this.CardlistMModel.find().exec()
  }
  async getAllCardlistByBoardId(board_id: string) {
    return this.CardlistMModel.find({ board_id }).exec()
  }
}

export class CardlistServiceMock implements ICardlistService {
  createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest) {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({ ...data, _id: 'Mock-id', watcher_email: [], cards: [] })
    })
  }

  copyCardlist(data: TrelloApi.CardlistApi.CopyCardlistRequest) {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({
        ...data,
        board_id: 'Mock-id',
        name: '',
        watcher_email: [],
        cards: [],
        archive_at: null
      })
    })
  }
  getAllCardlist() {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }

  getAllCardlistByBoardId() {
    return new Promise<DbSchemas.CardlistSchema.CardList[]>((res) => {
      return res([])
    })
  }
}
