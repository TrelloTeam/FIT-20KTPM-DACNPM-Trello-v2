import { Module } from '@nestjs/common'
import { CardlistMModule } from '@/database/modules'
import { CardController } from './controllers/card.controller'
import { CardService } from './services/card.service'
import { CardMSController } from './controllers/card.ms.controller'

@Module({
  imports: [CardlistMModule],
  controllers: [CardController, CardMSController],
  providers: [CardService],
})
export class CardModule {}
