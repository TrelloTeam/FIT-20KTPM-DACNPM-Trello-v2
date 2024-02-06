import { InjectController, InjectRoute } from '@/decorators'
import { TrelloApi } from '@trello-v2/shared'

import workspaceRoutes from '../workspace.routes'
import { WorkspaceService } from '../workspace.service'

@InjectController({
  name: workspaceRoutes.index,
  isCore: true
})
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @InjectRoute(workspaceRoutes.getAll)
  async getAll(): Promise<TrelloApi.WorkspaceApi.GetallWorkspaceResponse> {
    const data = await this.workspaceService.getAllWorkspaces()
    return { data }
  }
}
