import { Module } from '@nestjs/common'
import { BoardController } from './controllers/board.controller'
import { BoardService } from './services/board.service'
import { BoardMModule } from '@app/common/database/modules'

@Module({
  imports: [BoardMModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
