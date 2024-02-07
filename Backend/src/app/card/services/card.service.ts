import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'

export class CardService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>
  ) {}

  async createCard(data: TrelloApi.CardApi.CreateCard) {
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

    return cardlist.cards[cardlist.cards.length - 1]
  }
}
