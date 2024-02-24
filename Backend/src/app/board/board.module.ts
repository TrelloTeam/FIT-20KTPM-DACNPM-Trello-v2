import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BoardController } from './controllers/board.controller'
import { BoardService } from './services/board.service'
import { BoardMModule } from '@/database/modules'

@Module({
  imports: [BoardMModule],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
