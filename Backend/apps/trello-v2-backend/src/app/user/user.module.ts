import { ActivityMModule, UserMModule } from '@app/common/database/modules'
import { Module } from '@nestjs/common'

import { UserController } from './controllers/user.controller'
import { UserMSController } from './controllers/user.ms.controller'
import { UserService } from './services/user.service'

@Module({
  imports: [UserMModule, ActivityMModule],
  controllers: [UserController, UserMSController],
  providers: [UserService],
})
export class UserModule {}
