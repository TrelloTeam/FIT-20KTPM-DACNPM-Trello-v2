import { InjectController, InjectRoute } from '@/decorators'
import { CardlistService } from '../services/cardlist.service'
import { CardlistRoutes } from '../cardlist.routes'
import { Body } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'
import { SwaggerApi } from '@/decorators/swagger.decorator'
import { getSchemaPath } from '@nestjs/swagger'

@InjectController({
  name: 'cardlist',
  isCore: true
})
export class CardlistController {
  constructor(private cardlistService: CardlistService) {}

  @InjectRoute(CardlistRoutes.getAllCardlistApi)
  @SwaggerApi({
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallCardlistResponseSchema') }
      }
    ]
  })
  async getAll(): Promise<TrelloApi.CardlistApi.GetallCardlistResponse> {
    const data = await this.cardlistService.getAllCardlist()
    return {
      data: data
    }
  }

  @InjectRoute(CardlistRoutes.createCardlistApi)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('CreateCardlistRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CreateCardlistResponseSchema') }
      }
    ]
  })
  async create(
    @Body(
      new ZodValidationPipe(TrelloApi.CardlistApi.CreateCardlistRequestSchema)
    )
    body: TrelloApi.CardlistApi.CreateCardlistRequest
  ): Promise<TrelloApi.CardlistApi.CreateCardlistResponse> {
    const data = await this.cardlistService.createCardlist(body)
    return {
      data: data
    }
  }
}
