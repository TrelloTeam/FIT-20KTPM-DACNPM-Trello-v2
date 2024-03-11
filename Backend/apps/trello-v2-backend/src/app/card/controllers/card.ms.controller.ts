import { InjectController, InjectRoute, ValidateGrpcInput } from '@app/common/decorators'
import { CardService } from '../services/card.service'
import { Body, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common'
import { TrelloApi } from '@trello-v2/shared'
import { RpcException, GrpcMethod } from '@nestjs/microservices'
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'

@InjectController({
  name: 'card',
  isCore: true,
})
export class CardMSController {
  constructor(private cardService: CardService) {}

  @GrpcMethod('CardService', 'CreateCard')
  async createCard(
    @ValidateGrpcInput(TrelloApi.CardApi.CreateCardRequestSchema.safeParse)
    body: TrelloApi.CardApi.CreateCardRequest,
  ): Promise<TrelloApi.CardApi.CreateCardRespond> {
    const cardData = await this.cardService.createCard(body)
    if (!cardData || !cardData._id) throw new RpcException(new InternalServerErrorException("Can't create card"))
    return {
      data: {
        ...cardData,
        _id: cardData._id,
      },
    }
  }

  @GrpcMethod('CardService', 'GetAllCardsOfCardlist')
  async getAllCardsOfCardlist(
    @ValidateGrpcInput(TrelloApi.CardApi.GetAllCardsOfCardlistRequestSchema.safeParse)
    query: TrelloApi.CardApi.GetCardsOfCardlistRequest,
  ): Promise<any> {
    const cardlist = await this.cardService.getAllCardsOfCardlist(query)
    if (!cardlist) throw new RpcException(new InternalServerErrorException("Can't find cards"))

    const cards = cardlist.cards.reduce(
      (acum, value) => {
        if (value._id) {
          acum.push({
            ...value,
            _id: value._id,
          })
        }
        return acum
      },
      [] as TrelloApi.CardApi.GetAllCardsOfCardlistResponse['data']['cards'],
    )
    return {
      data: {
        ...cardlist,
        cards: cards,
      },
    }
  }

  @GrpcMethod('CardService', 'GetCardDetail')
  async getCardDetail(
    @ValidateGrpcInput(TrelloApi.CardApi.GetCardDetailRequestSchema.safeParse)
    query: TrelloApi.CardApi.GetCardDetailRequest,
  ): Promise<TrelloApi.CardApi.GetCardDetailResponse> {
    const card = await this.cardService.getCardDetail(query)
    if (!card?._id) throw new RpcException(new NotFoundException("Can't find card id"))
    return {
      data: { ...card, _id: card._id },
    }
  }

  @GrpcMethod('CardService', 'UpdateCardDetail')
  async updateCardDetail(
    @ValidateGrpcInput(TrelloApi.CardApi.UpdateCardDetailRequestSchema.safeParse)
    body: TrelloApi.CardApi.UpdateCardDetailRequest,
  ): Promise<TrelloApi.CardApi.UpdateCardDetailResponse> {
    const card = await this.cardService.updateCardDetail(body)
    if (!card) throw new NotFoundException("Can't find card")
    return {
      data: {
        ...card,
        _id: body.card_id,
      },
    }
  }

  @GrpcMethod('CardService', 'AddFeatureToCard')
  async addFeatureToCard(
    @ValidateGrpcInput(TrelloApi.CardApi.AddCardFeatureRequestSchema.safeParse)
    body: TrelloApi.CardApi.AddCardFeatureRequest,
  ): Promise<TrelloApi.CardApi.AddCardFeatureResponse> {
    const feature = await this.cardService.addFeatureToCard(body)
    if (!feature || !feature._id) throw new InternalServerErrorException("Can't add feature")

    return {
      data: {
        ...feature,
        _id: feature._id,
      },
    }
  }

  @GrpcMethod('CardService', 'UpdateFeatureToCard')
  async updateFeatureToCard(
    @ValidateGrpcInput(TrelloApi.CardApi.UpdateCardFeatureRequestSchema.safeParse)
    body: TrelloApi.CardApi.UpdateCardFeatureRequest,
  ): Promise<TrelloApi.CardApi.UpdateCardFeatureResponse> {
    const feature = await this.cardService.updateFeatureOfCard(body)
    if (!feature || !feature._id) throw new InternalServerErrorException("Can't update card feature")
    return {
      data: {
        ...feature,
        _id: feature._id,
      },
    }
  }

  @GrpcMethod('CardService', 'AddWatcherToCard')
  async addWatcherToCard(
    @ValidateGrpcInput(TrelloApi.CardApi.AddWatcherToCardRequestSchema.safeParse)
    body: TrelloApi.CardApi.AddWatcherToCardRequest,
  ): Promise<TrelloApi.CardApi.AddWatcherToCardResponse> {
    const card = await this.cardService.addWatcherToCard(body)
    if (!card || !card._id) throw new InternalServerErrorException("Can't add watcher to card")

    return {
      data: {
        ...card,
        _id: card._id,
      },
    }
  }

  @GrpcMethod('CardService', 'DeleteWatcherToCard')
  async deleteWatcherToCard(
    @ValidateGrpcInput(TrelloApi.CardApi.DeleteWatcherToCardRequestSchema.safeParse)
    body: TrelloApi.CardApi.DeleteWatcherToCardRequest,
  ): Promise<TrelloApi.CardApi.DeleteWatcherToCardResponse> {
    const card = await this.cardService.deleteWatcherFromCard(body)
    if (!card || !card._id) throw new InternalServerErrorException("Can't add watcher to card")

    return {
      data: {
        ...card,
        _id: card._id,
      },
    }
  }

  @GrpcMethod('CardService', 'ArchiveCard')
  async archiveCard(
    @ValidateGrpcInput(TrelloApi.CardApi.ArchiveCardRequestSchema.safeParse)
    body: TrelloApi.CardApi.ArchiveCardRequest,
  ): Promise<TrelloApi.CardApi.ArchiveCardResponse> {
    const card = await this.cardService.archiveCard(body)
    if (!card || !card._id) throw new InternalServerErrorException("Can't archive card")
    return {
      data: {
        ...card,
        _id: card._id,
      },
    }
  }

  @GrpcMethod('CardService', 'UnarchiveCard')
  async unArchiveCard(
    @ValidateGrpcInput(TrelloApi.CardApi.UnArchiveCardRequestSchema.safeParse)
    body: TrelloApi.CardApi.ArchiveCardRequest,
  ): Promise<TrelloApi.CardApi.UnArchiveCardResponse> {
    const card = await this.cardService.unArchiveCard(body)
    if (!card || !card._id) throw new InternalServerErrorException("Can't unarchive card")
    return {
      data: {
        ...card,
        _id: card._id,
      },
    }
  }

  @GrpcMethod('CardService', 'MoveCardSamelist')
  async moveCardSamelist(
    @ValidateGrpcInput(TrelloApi.CardApi.MoveCardSamelistRequestSchema.safeParse)
    body: TrelloApi.CardApi.MoveCardSamelistRequest,
  ): Promise<TrelloApi.CardApi.MoveCardSamelistResponse> {
    const cards = await this.cardService.moveCardSamelist(body)
    if (!cards) throw new InternalServerErrorException("Can't move card")
    return {
      data: cards,
    }
  }
}
