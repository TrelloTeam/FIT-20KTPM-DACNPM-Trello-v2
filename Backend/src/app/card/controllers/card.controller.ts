import { InjectController, InjectRoute } from '@/decorators'
import { CardService } from '../services/card.service'
import { CardRoutes } from '../card.routes'
import {
  Body,
  InternalServerErrorException,
  NotFoundException,
  Query
} from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'
import { SwaggerApi } from '@/decorators/swagger.decorator'
import { ApiQuery, getSchemaPath } from '@nestjs/swagger'
import { CallAndCatchAsync } from '@/utils/helpers'

@InjectController({
  name: 'card',
  isCore: true
})
export class CardController {
  constructor(private cardService: CardService) {}

  @InjectRoute(CardRoutes.createCard)
  @SwaggerApi({
    secure: false,
    body: {
      schema: { $ref: getSchemaPath('CreateCardRequestSchema') }
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CreateCardRespondSchema') }
      }
    ]
  })
  async createCard(
    @Body(new ZodValidationPipe(TrelloApi.CardApi.CreateCardRequestSchema))
    body: TrelloApi.CardApi.CreateCardRequest
  ): Promise<TrelloApi.CardApi.CreateCardRespond> {
    const cardData = await this.cardService.createCard(body)
    if (!cardData || !cardData._id)
      throw new InternalServerErrorException("Can't create card")
    return {
      data: {
        ...cardData,
        _id: cardData._id
      }
    }
  }

  @InjectRoute(CardRoutes.getAllCardsOfCardlist)
  @SwaggerApi({
    secure: false,
    query: {
      name: 'query',
      schema: { $ref: getSchemaPath('GetAllCardsOfCardlistRequestSchema') },
      style: 'form',
      explode: true
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetAllCardsOfCardlistResponseSchema') }
      }
    ]
  })
  async getAllCardsOfCardlist(
    @Query(
      new ZodValidationPipe(
        TrelloApi.CardApi.GetAllCardsOfCardlistRequestSchema
      )
    )
    query: TrelloApi.CardApi.GetCardsOfCardlistRequest
  ): Promise<TrelloApi.CardApi.GetAllCardsOfCardlistResponse> {
    const cardlist = await this.cardService.getAllCardsOfCardlist(query)
    if (!cardlist) throw new InternalServerErrorException("Can't find cards")

    const cards = cardlist.cards.reduce(
      (acum, value) => {
        if (value._id) {
          acum.push({
            ...value,
            _id: value._id
          })
        }
        return acum
      },
      [] as TrelloApi.CardApi.GetAllCardsOfCardlistResponse['data']['cards']
    )

    return {
      data: {
        ...cardlist,
        cards: cards
      }
    }
  }

  @InjectRoute(CardRoutes.getCardDetail)
  @SwaggerApi({
    query: {
      name: 'query',
      schema: { $ref: getSchemaPath('GetCardDetailRequestSchema') },
      style: 'form',
      explode: true
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetCardDetailResponseSchema') }
      }
    ]
  })
  async getCardDetail(
    @Query(new ZodValidationPipe(TrelloApi.CardApi.GetCardDetailRequestSchema))
    query: TrelloApi.CardApi.GetCardDetailRequest
  ): Promise<TrelloApi.CardApi.GetCardDetailResponse> {
    const card = await this.cardService.getCardDetail(query)
    if (!card?._id) throw new NotFoundException("Can't find card id")
    return {
      data: { ...card, _id: card._id }
    }
  }

  @InjectRoute(CardRoutes.updateCardDetail)
  @SwaggerApi({
    secure: false,
    body: { schema: { $ref: getSchemaPath('UpdateCardDetailRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('UpdateCardDetailResponseSchema') }
      }
    ]
  })
  async updateCardDetail(
    @Body(
      new ZodValidationPipe(TrelloApi.CardApi.UpdateCardDetailRequestSchema)
    )
    body: TrelloApi.CardApi.UpdateCardDetailRequest
  ): Promise<TrelloApi.CardApi.UpdateCardDetailResponse> {
    const card = await this.cardService.updateCardDetail(body)
    if (!card) throw new NotFoundException("Can't find card")

    return {
      data: {
        ...card,
        _id: body.card_id
      }
    }
  }

  @InjectRoute(CardRoutes.addFeatureToCard)
  @SwaggerApi({
    secure: false,
    body: { schema: { $ref: getSchemaPath('AddCardFeatureRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('AddCardFeatureResponseSchema') }
      }
    ]
  })
  async addFeatureToCard(
    @Body(new ZodValidationPipe(TrelloApi.CardApi.AddCardFeatureRequestSchema))
    body: TrelloApi.CardApi.AddCardFeatureRequest
  ): Promise<TrelloApi.CardApi.AddCardFeatureResponse> {
    const feature = await this.cardService.addFeatureToCard(body)
    if (!feature || !feature._id)
      throw new InternalServerErrorException("Can't add feature")

    return {
      data: {
        ...feature,
        _id: feature._id
      }
    }
  }

  @InjectRoute(CardRoutes.updateFeatureToCard)
  @SwaggerApi({
    secure: false,
    body: { schema: { $ref: getSchemaPath('UpdateCardFeatureRequestSchema') } }
  })
  async updateFeatureToCard(
    @Body(
      new ZodValidationPipe(TrelloApi.CardApi.UpdateCardFeatureRequestSchema)
    )
    body: TrelloApi.CardApi.UpdateCardFeatureRequest
  ) {
    return (await this.cardService.updateFeatureOfCard(body)) || {}
  }
}
