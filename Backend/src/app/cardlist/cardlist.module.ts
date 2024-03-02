import { Module } from '@nestjs/common'
import { CardlistController } from './controllers/cardlist.controller'
import { CardlistService } from './services/cardlist.service'
import { BoardMModule, CardlistMModule } from '@/database/modules'
import { CardlistMSController } from './controllers/cardlist.ms.controller'

@Module({
  imports: [CardlistMModule, BoardMModule],
  controllers: [CardlistController, CardlistMSController],
  providers: [CardlistService],
})
export class CardlistModule {}
