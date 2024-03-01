import { InjectController, InjectRoute, ValidateGrpcInput } from '@/decorators'
import { CardService } from '../services/card.service'
import { Body, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common'
import { TrelloApi } from '@trello-v2/shared'
import { GrpcMethod, RpcException } from '@nestjs/microservices'
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'

@InjectController({
  name: 'card',
  isCore: true,
})
export class CardMSController {
  constructor(private cardService: CardService) {}

  @GrpcMethod('CardService', 'GetAllCardsOfCardlist')
  async getAllCardsOfCardlist(
    @ValidateGrpcInput(TrelloApi.CardApi.GetAllCardsOfCardlistRequestSchema.safeParse)
    query: TrelloApi.CardApi.GetCardsOfCardlistRequest,
  ): Promise<TrelloApi.CardApi.GetAllCardsOfCardlistResponse> {
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
}
