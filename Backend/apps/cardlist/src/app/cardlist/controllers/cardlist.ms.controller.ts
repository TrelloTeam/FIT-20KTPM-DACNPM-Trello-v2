import { InjectController, ValidateGrpcInput } from '@app/common/decorators'
import { CardlistService } from '../services/cardlist.service'
import { TrelloApi } from '@trello-v2/shared'
import { GrpcMethod } from '@nestjs/microservices'

@InjectController({
  name: 'cardlist',
  isCore: true,
})
export class CardlistMSController {
  constructor(private cardlistService: CardlistService) {}

  @GrpcMethod('CardlistService', 'GetAllCardlist')
  async getAll(): Promise<TrelloApi.CardlistApi.GetallCardlistResponse> {
    const data = await this.cardlistService.getAllCardlist()
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'CreateCardlist')
  async create(
    @ValidateGrpcInput(TrelloApi.CardlistApi.CreateCardlistRequestSchema.safeParse)
    body: TrelloApi.CardlistApi.CreateCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.CreateCardlistResponse> {
    const data = await this.cardlistService.createCardlist(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'CopyCardlist')
  async copy(
    @ValidateGrpcInput(TrelloApi.CardlistApi.CopyCardlistRequestSchema.safeParse)
    body: TrelloApi.CardlistApi.CopyCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.CopyCardlistResponse> {
    const data = await this.cardlistService.copyCardlist(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'GetAllByBoardId')
  async getAllByBoardId(
    @ValidateGrpcInput(TrelloApi.CardlistApi.BoardIdRequestParamsSchema.safeParse) { board_id }: TrelloApi.CardlistApi.BoardIdRequestParams,
  ): Promise<TrelloApi.CardlistApi.GetallCardlistByBoardIdResponse> {
    const data = await this.cardlistService.getAllCardlistByBoardId(board_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'SortByOldestDate')
  async sortByOldestDate(
    @ValidateGrpcInput(TrelloApi.CardlistApi.BoardIdRequestParamsSchema.safeParse) { board_id }: TrelloApi.CardlistApi.BoardIdRequestParams,
  ): Promise<TrelloApi.CardlistApi.SortCardlistByOldestDateResponse> {
    const data = await this.cardlistService.sortCardlistByOldestDate(board_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'SortByNewestDate')
  async sortByNewestDate(
    @ValidateGrpcInput(TrelloApi.CardlistApi.BoardIdRequestParamsSchema.safeParse) { board_id }: TrelloApi.CardlistApi.BoardIdRequestParams,
  ): Promise<TrelloApi.CardlistApi.SortCardlistByNewestDateResponse> {
    const data = await this.cardlistService.sortCardlistByNewestDate(board_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'SortByName')
  async sortByName(
    @ValidateGrpcInput(TrelloApi.CardlistApi.BoardIdRequestParamsSchema.safeParse) { board_id }: TrelloApi.CardlistApi.BoardIdRequestParams,
  ): Promise<TrelloApi.CardlistApi.SortCardlistByNameResponse> {
    const data = await this.cardlistService.sortCardlistByName(board_id)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'UpdateCardlist')
  async update(
    @ValidateGrpcInput(TrelloApi.CardlistApi.UpdateCardlistRequestSchema.safeParse)
    body: TrelloApi.CardlistApi.UpdateCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.UpdateCardlistResponse> {
    const data = await this.cardlistService.updateCardlist(body)
    return {
      data: data,
    }
  }

  @GrpcMethod('CardlistService', 'MoveCardlist')
  async move(
    @ValidateGrpcInput(TrelloApi.CardlistApi.MoveCardlistRequestSchema.safeParse)
    body: TrelloApi.CardlistApi.MoveCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.MoveCardlistResponse> {
    const data = await this.cardlistService.moveCardlist(body)
    return {
      data: data,
    }
  }
}
