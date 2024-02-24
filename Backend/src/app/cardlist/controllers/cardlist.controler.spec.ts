import { Test } from '@nestjs/testing'
import { CardlistController } from './cardlist.controler'
import { CardlistService, CardlistServiceMock } from '../services/cardlist.service'
import { TrelloApi } from '@trello-v2/shared'

describe('CardlistController', () => {
  let controller: CardlistController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardlistController],
      providers: [CardlistService],
    })
      .overrideProvider(CardlistService)
      .useValue(new CardlistServiceMock())
      .compile()

    controller = moduleRef.get(CardlistController)
  })

  describe('Cardlist:Get all cardlists', () => {
    it('Return all cardlists', async () => {
      const data = await controller.getAll()
      expect(TrelloApi.CardlistApi.GetallCardlistResponseSchema.safeParse(data).success).toBeTruthy()
    })
  })
})
