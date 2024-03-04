import { BoardMModule } from '@/database/modules'
import { Module } from '@nestjs/common'

import { BoardController } from './controllers/board.controller'
import { BoardMSController } from './controllers/board.ms.controller'
import { BoardService } from './services/board.service'

@Module({
  imports: [BoardMModule],
  controllers: [BoardController, BoardMSController],
  providers: [BoardService],
})
export class BoardModule {}
