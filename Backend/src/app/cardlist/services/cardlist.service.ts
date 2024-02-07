import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'
// import { objectOutputType, ZodString, ZodTypeAny } from 'zod'

export abstract class ICardlistService {
  abstract createCardlist(
    data: TrelloApi.CardlistApi.CreateCardlistRequest
  ): Promise<DbSchemas.CardlistSchema.CardList>

  abstract getAllCardlist(): Promise<DbSchemas.CardlistSchema.CardList[]>

  abstract getAllCardlistByBoardId(
    board_id: TrelloApi.CardlistApi.GetallCardlistByBoardIdRequest
  ): Promise<DbSchemas.CardlistSchema.CardList[]>
}

export class CardlistService implements ICardlistService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>
  ) {}

  async createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest) {
    const model = new this.CardlistMModel(data)
    return model.save()
  }
  async getAllCardlist() {
    return this.CardlistMModel.find().exec()
  }
  async getAllCardlistByBoardId(
    board_id: TrelloApi.CardlistApi.GetallCardlistByBoardIdRequest
  ) {
    return this.CardlistMModel.find({ board_id }).exec()
  }
}

export class CardlistServiceMock implements ICardlistService {
  createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest) {
    return new Promise<DbSchemas.CardlistSchema.CardList>((res) => {
      return res({ ...data, _id: 'Mock-id', watcher_email: [], cards: [] })
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
