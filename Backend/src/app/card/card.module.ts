import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CardlistMModule } from '@/database/modules'

@Module({
  imports: [CardlistMModule],
  controllers: [],
  providers: []
})
export class CardlistModule {}
