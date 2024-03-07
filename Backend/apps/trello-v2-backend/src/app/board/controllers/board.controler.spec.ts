import { Test } from '@nestjs/testing'
import { BoardController } from './board.controller'
import { BoardService, BoardServiceMock } from '../services/board.service'
import { TrelloApi } from '@trello-v2/shared'

describe('BoardController', () => {
  let controller: BoardController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [BoardService],
    })
      .overrideProvider(BoardService)
      .useValue(new BoardServiceMock())
      .compile()

    controller = moduleRef.get(BoardController)
  })

  describe('Board:Get all boards', () => {
    it('Return all boards', async () => {
      const data = await controller.getAll()
      expect(TrelloApi.BoardApi.GetallBoardResponseSchema.safeParse(data).success).toBeTruthy()
    })
  })
})
