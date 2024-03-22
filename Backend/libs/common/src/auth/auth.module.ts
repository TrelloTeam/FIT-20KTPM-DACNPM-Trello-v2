import { Module } from '@nestjs/common'

import { KeycloakConfigService } from './auth.service'

@Module({
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class AuthModule {}
