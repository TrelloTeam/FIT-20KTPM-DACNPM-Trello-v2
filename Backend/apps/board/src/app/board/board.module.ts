import { Module } from '@nestjs/common'
import { BoardController } from './controllers/board.controller'
import { BoardService } from './services/board.service'
import { BoardMSController } from './controllers/board.ms.controller'
import { BoardMModule } from '@app/common/database/modules'

@Module({
  imports: [BoardMModule],
  controllers: [BoardController, BoardMSController],
  providers: [BoardService],
})
export class BoardModule {}
