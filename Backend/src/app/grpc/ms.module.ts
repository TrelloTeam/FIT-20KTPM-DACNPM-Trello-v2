import { Module } from '@nestjs/common'
import { HelloController } from './hello/hello.controller'

@Module({
  imports: [],
  providers: [],
  controllers: [HelloController],
})
export class MSModule {}
