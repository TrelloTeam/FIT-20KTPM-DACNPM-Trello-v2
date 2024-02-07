import { InjectController, InjectRoute } from '@/decorators'
import { CardService } from '../services/card.service'
import { CardRoutes } from '../card.routes'
import { Body, InternalServerErrorException, Query } from '@nestjs/common'
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
    }
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
    }
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
}
