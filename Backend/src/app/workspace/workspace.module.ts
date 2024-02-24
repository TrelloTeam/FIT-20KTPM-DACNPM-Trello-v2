import { WorkspaceMModule } from '@/database/modules'
import { Module } from '@nestjs/common'

import { WorkspaceController } from './controllers/workspace.controller'
import { WorkspaceService } from './workspace.service'

@Module({
  imports: [WorkspaceMModule],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
