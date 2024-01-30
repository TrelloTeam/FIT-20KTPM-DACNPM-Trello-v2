import { InjectController, InjectRoute } from '@/decorators'
import { CardlistService } from '../services/cardlist.service'
import { CardlistRoutes } from '../cardlist.routes'
import { Body } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'

@InjectController({
  name: 'core',
  isCore: true,
})
export class CardlistController {
  constructor(private cardlistService: CardlistService) {}

  @InjectRoute(CardlistRoutes.getAllCardlistApi)
  async getAll(): Promise<TrelloApi.CardlistApi.GetallCardlistResponse> {
    const data = await this.cardlistService.getAllCardlist()
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.createCardlistApi)
  async create(
    @Body(
      new ZodValidationPipe(TrelloApi.CardlistApi.CreateCardlistRequestSchema),
    )
    body: TrelloApi.CardlistApi.CreateCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.CreateCardlistResponse> {
    const data = await this.cardlistService.createCardlist(body)
    return {
      data: data,
    }
  }
}
