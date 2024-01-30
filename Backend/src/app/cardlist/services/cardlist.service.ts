import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'
import { TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'
export class CardlistService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>,
  ) {}

  async createCardlist(data: TrelloApi.CardlistApi.CreateCardlistRequest) {
    const model = new this.CardlistMModel(data)
    return model.save()
  }
  async getAllCardlist() {
    return this.CardlistMModel.find().exec()
  }
}
