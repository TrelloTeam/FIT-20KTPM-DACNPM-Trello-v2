import { Module } from '@nestjs/common'
import { CardlistController } from './controllers/cardlist.controller'
import { CardlistService } from './services/cardlist.service'
import { BoardMModule, CardMModule, CardlistMModule } from '@/database/modules'

@Module({
  imports: [CardlistMModule, BoardMModule, CardMModule],
  controllers: [CardlistController],
  providers: [CardlistService],
})
export class CardlistModule {}
