import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'

export class CardService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[0])
    private CardlistMModel: Model<DbSchemas.CardlistSchema.CardList>,
  ) {}

  async getAllCardsOfCardlist(data: TrelloApi.CardApi.GetCardsOfCardlistRequest) {
    const cardlist = await this.CardlistMModel.findById(data.cardlist_id, {
      'cards.activities': 0,
      'cards.features': 0,
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
      features: [],
    })
    await cardlist.save()

    const { cards } = cardlist.toJSON()
    return cards[cards.length - 1]
  }

  async getCardDetail(data: TrelloApi.CardApi.GetCardDetailRequest) {
    const cardlist = await this.CardlistMModel.findById(data.cardlist_id, {
      cards: { $elemMatch: { _id: data.card_id } },
    })
    const cardlistJson = cardlist?.toJSON()
    return cardlistJson && cardlistJson.cards.length >= 0 ? cardlistJson.cards[0] : null
  }

  async updateCardDetail(data: TrelloApi.CardApi.UpdateCardDetailRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      {
        $set: {
          ...(data.name ? { 'cards.$.name': data.name } : {}),
          ...(data.cover ? { 'cards.$.cover': data.cover } : {}),
        },
      },
      { new: true },
    ).exec()
    if (!res) return null
    const newCard = res.toJSON().cards.find((c) => c._id?.toString() === data.card_id)
    return newCard ? newCard : null
  }

  async addFeatureToCard(data: TrelloApi.CardApi.AddCardFeatureRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      {
        $push: {
          'cards.$.features': data.feature,
        },
      },
      { new: true },
    ).exec()
    const newCard = res?.toJSON().cards.find((e) => e._id?.toString() === data.card_id)
    return newCard ? newCard.features[newCard.features.length - 1] : null
  }

  async updateFeatureOfCard(data: TrelloApi.CardApi.UpdateCardFeatureRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: {
          $elemMatch: {
            features: { $elemMatch: { _id: data.feature._id } },
          },
        },
      },
      {
        $set: {
          'cards.$[i].features.$[j]': { ...data.feature },
        },
      },
      {
        new: true,
        arrayFilters: [{ 'i._id': data.card_id }, { 'j._id': data.feature._id }],
      },
    )
    const feature = res
      ?.toJSON()
      .cards.find((e) => e._id?.toString() === data.card_id)
      ?.features.find((e) => e._id?.toString() === data.feature._id)
    return feature
  }

  async addWatcherToCard(data: TrelloApi.CardApi.AddWatcherToCardRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      {
        $push: { 'cards.$.watcher_email': data.watcher_email },
      },
      { new: true, fields: { 'cards.features': 0, 'cards.activities': 0 } },
    )
    const card = res?.toJSON().cards.find((e) => e._id?.toString() === data.card_id)
    return card ? card : null
  }

  async deleteWatcherFromCard(data: TrelloApi.CardApi.DeleteWatcherToCardRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      {
        $pullAll: {
          'cards.$.watcher_email': [data.watcher_email],
        },
      },
      { new: true, fields: { 'cards.features': 0, 'cards.activities': 0 } },
    )
    const card = res?.toJSON().cards.find((e) => e._id?.toString() === data.card_id)
    return card ? card : null
  }

  async archiveCard(data: TrelloApi.CardApi.ArchiveCardRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      { $set: { 'cards.$.archive_at': new Date().toISOString() } },
      { new: true, fields: { 'cards.features': 0, 'cards.activities': 0 } },
    )
    const card = res?.toJSON().cards.find((e) => e._id?.toString() === data.card_id)
    return card ? card : null
  }

  async unArchiveCard(data: TrelloApi.CardApi.UnArchiveCardRequest) {
    const res = await this.CardlistMModel.findOneAndUpdate(
      {
        _id: data.cardlist_id,
        cards: { $elemMatch: { _id: data.card_id } },
      },
      { $unset: { 'cards.$.archive_at': 1 } },
      { new: true, fields: { 'cards.features': 0, 'cards.activities': 0 } },
    )
    const card = res?.toJSON().cards.find((e) => e._id?.toString() === data.card_id)
    return card ? card : null
  }

  async moveCardSamelist(data: TrelloApi.CardApi.MoveCardSamelistRequest) {
    const cardlist = await this.CardlistMModel.findById(data.cardlist_id, {
      'cards.activities': 0,
      'cards.features': 0,
      'cards.watcher_email': 0,
      'cards.archive_at': 0,
      'cards.cover': 0,
      'cards.description': 0,
    })
    if (!cardlist) return null

    for (let i = 0; i < cardlist.cards.length; i++) {
      const id = cardlist.cards[i]._id
      if (id && typeof data.cards_data[id] === 'number') cardlist.cards[i].index = data.cards_data[id]
    }
    await cardlist.save()
    return cardlist.toJSON().cards
  }
}
