import { Module } from '@nestjs/common'
import { CardlistMModule } from '@app/common/database/modules'
import { CardController } from './controllers/card.controller'
import { CardService } from './services/card.service'

@Module({
  imports: [CardlistMModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
