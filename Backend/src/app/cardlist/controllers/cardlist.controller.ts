import { InjectController, InjectRoute } from '@/decorators'
import { CardlistService } from '../services/cardlist.service'
import { CardlistRoutes } from '../cardlist.routes'
import { Body, Param } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'
import { SwaggerApi } from '@/decorators/swagger.decorator'
import { getSchemaPath } from '@nestjs/swagger'

@InjectController({
  name: 'cardlist',
  isCore: true,
})
export class CardlistController {
  constructor(private cardlistService: CardlistService) {}

  @InjectRoute(CardlistRoutes.getAllCardlistApi)
  @SwaggerApi({
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallCardlistResponseSchema') },
      },
    ],
  })
  async getAll(): Promise<TrelloApi.CardlistApi.GetallCardlistResponse> {
    const data = await this.cardlistService.getAllCardlist()
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.createCardlistApi)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('CreateCardlistRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CreateCardlistResponseSchema') },
      },
    ],
  })
  async create(
    @Body(new ZodValidationPipe(TrelloApi.CardlistApi.CreateCardlistRequestSchema))
    body: TrelloApi.CardlistApi.CreateCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.CreateCardlistResponse> {
    const data = await this.cardlistService.createCardlist(body)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.copyCardlistApi)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('CopyCardlistRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CopyCardlistResponseSchema') },
      },
    ],
  })
  async copy(
    @Body(new ZodValidationPipe(TrelloApi.CardlistApi.CopyCardlistRequestSchema))
    body: TrelloApi.CardlistApi.CopyCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.CopyCardlistResponse> {
    const data = await this.cardlistService.copyCardlist(body)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.getCardlistsByBoardId)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallCardlistByBoardIdResponseSchema') },
      },
    ],
  })
  async getAllByBoardId(@Param('boardId') boardId: string): Promise<TrelloApi.CardlistApi.GetallCardlistByBoardIdResponse> {
    const data = await this.cardlistService.getAllCardlistByBoardId(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.getCardlistsArchivedByBoardId)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallCardlistArchivedByBoardIdResponseSchema') },
      },
    ],
  })
  async getAllArchivedByBoardId(@Param('boardId') boardId: string): Promise<TrelloApi.CardlistApi.GetallCardlistArchivedByBoardIdResponse> {
    const data = await this.cardlistService.getAllCardlistArchivedByBoardId(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.getCardlistsNonArchivedByBoardId)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallCardlistNonArchivedByBoardIdResponseSchema') },
      },
    ],
  })
  async getAllNonArchivedByBoardId(
    @Param('boardId') boardId: string,
  ): Promise<TrelloApi.CardlistApi.GetallCardlistNonArchivedByBoardIdResponse> {
    const data = await this.cardlistService.getAllCardlistNonArchivedByBoardId(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.sortCardlistsByOldestDate)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: {
          $ref: getSchemaPath('SortCardlistByOldestDateResponseSchema'),
        },
      },
    ],
  })
  async sortByOldestDate(@Param('boardId') boardId: string): Promise<TrelloApi.CardlistApi.SortCardlistByOldestDateResponse> {
    const data = await this.cardlistService.sortCardlistByOldestDate(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.sortCardlistsByNewestDate)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: {
          $ref: getSchemaPath('SortCardlistByNewestDateResponseSchema'),
        },
      },
    ],
  })
  async sortByNewestDate(@Param('boardId') boardId: string): Promise<TrelloApi.CardlistApi.SortCardlistByNewestDateResponse> {
    const data = await this.cardlistService.sortCardlistByNewestDate(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.sortCardlistsByName)
  @SwaggerApi({
    params: {
      name: 'boardId',
      schema: {
        type: 'string',
      },
    },
    responses: [
      {
        status: 200,
        schema: {
          $ref: getSchemaPath('SortCardlistByNameResponseSchema'),
        },
      },
    ],
  })
  async sortByName(@Param('boardId') boardId: string): Promise<TrelloApi.CardlistApi.SortCardlistByNameResponse> {
    const data = await this.cardlistService.sortCardlistByName(boardId)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.updateCardlists)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('UpdateCardlistRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('UpdateCardlistResponseSchema') },
      },
    ],
  })
  async update(
    @Body(new ZodValidationPipe(TrelloApi.CardlistApi.UpdateCardlistRequestSchema))
    body: TrelloApi.CardlistApi.UpdateCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.UpdateCardlistResponse> {
    const data = await this.cardlistService.updateCardlist(body)
    return {
      data: data,
    }
  }

  @InjectRoute(CardlistRoutes.moveCardlists)
  @SwaggerApi({
    body: { schema: { $ref: getSchemaPath('MoveCardlistRequestSchema') } },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('MoveCardlistResponseSchema') },
      },
    ],
  })
  async move(
    @Body(new ZodValidationPipe(TrelloApi.CardlistApi.MoveCardlistRequestSchema))
    body: TrelloApi.CardlistApi.MoveCardlistRequest,
  ): Promise<TrelloApi.CardlistApi.MoveCardlistResponse> {
    const data = await this.cardlistService.moveCardlist(body)
    return {
      data: data,
    }
  }
}
