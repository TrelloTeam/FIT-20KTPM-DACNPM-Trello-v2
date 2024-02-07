import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'

export class CardService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>
  ) {}

  async getAllCardsOfCardlist(
    data: TrelloApi.CardApi.GetCardsOfCardlistRequest
  ) {
    const cardlist = await this.CardlistMModel.findById(data.cardlist_id, {
      activities: 0,
      features: 0
    })
    return cardlist ? cardlist.toJSON() : null
  }

  async createCard(data: TrelloApi.CardApi.CreateCardRequest) {
    const cardlist = await this.CardlistMModel.findById(data.cardlist_id)
    if (!cardlist) return null
    cardlist.cards.push({
      name: data.name,
      index: data.index,
      watcher_email: [],
      activities: [],
      features: []
    })
    await cardlist.save()

    const { cards } = cardlist.toJSON()
    return cards[cards.length - 1]
  }
}
