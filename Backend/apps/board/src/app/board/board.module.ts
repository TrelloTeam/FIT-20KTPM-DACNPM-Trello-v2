import { BoardMModule } from '@app/common/database/modules'
import { Module } from '@nestjs/common'

import { BoardController } from './controllers/board.controller'
import { BoardService } from './services/board.service'

@Module({
  imports: [BoardMModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
