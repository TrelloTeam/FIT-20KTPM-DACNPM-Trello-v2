import { WorkspaceMModule } from '@/database/modules'
import { Module } from '@nestjs/common'

import { WorkspaceService } from './workspace.service'

@Module({ imports: [WorkspaceMModule], controllers: [], providers: [WorkspaceService], exports: [] })
export class WorkspaceModule {}
