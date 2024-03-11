import { MemberMModule, WorkspaceMModule } from '@app/common/database/modules'
import { Module } from '@nestjs/common'

import { WorkspaceController } from './controllers/workspace.controller'
import { WorkspaceMSController } from './controllers/workspace.ms.controller'
import { WorkspaceService } from './workspace.service'

@Module({
  imports: [WorkspaceMModule, MemberMModule],
  controllers: [WorkspaceController, WorkspaceMSController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
