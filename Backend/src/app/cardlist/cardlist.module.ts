import { Module } from '@nestjs/common'
import { CardlistController } from './controllers/cardlist.controler'
import { CardlistService } from './services/cardlist.service'
import { CardlistMModule } from '@/database/modules'

@Module({
  imports: [CardlistMModule],
  controllers: [CardlistController],
  providers: [CardlistService],
})
export class CardlistModule {}
