import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { UserMModule } from '@/database/modules'

@Module({
  imports: [UserMModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
