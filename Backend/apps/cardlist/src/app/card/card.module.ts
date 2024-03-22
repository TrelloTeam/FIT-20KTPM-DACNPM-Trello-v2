import { Module } from '@nestjs/common'
import { CardlistMModule } from '@app/common/database/modules'
import { CardController } from './controllers/card.controller'
import { CardService } from './services/card.service'
import { CardGrpcController } from './controllers/card.grpc.controller'

@Module({
  imports: [CardlistMModule],
  controllers: [CardController, CardGrpcController],
  providers: [CardService],
})
export class CardModule {}
