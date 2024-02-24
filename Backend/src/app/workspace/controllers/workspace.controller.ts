import { InjectController, InjectRoute } from '@/decorators';
import { ZodValidationPipe } from '@/pipes';
import { Body, InternalServerErrorException } from '@nestjs/common';
import { TrelloApi } from '@trello-v2/shared';

import workspaceRoutes from '../workspace.routes';
import { WorkspaceService } from '../workspace.service';

@InjectController({
  name: workspaceRoutes.index,
  isCore: true,
})
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @InjectRoute(workspaceRoutes.getAll)
  async getAll(): Promise<TrelloApi.WorkspaceApi.GetallWorkspaceResponse> {
    const data = await this.workspaceService.getAllWorkspaces();
    return { data };
  }

  @InjectRoute(workspaceRoutes.createWorkspace)
  async createWorkspace(
    @Body(new ZodValidationPipe(TrelloApi.WorkspaceApi.CreateWorkspaceRequestSchema))
    body: TrelloApi.WorkspaceApi.CreateWorspaceRequest,
  ): Promise<TrelloApi.WorkspaceApi.CreateWorspaceResponse> {
    const workspaceData = await this.workspaceService.createWorkspace(body);

    if (!workspaceData || !workspaceData._id) throw new InternalServerErrorException("Can't create workspace");

    return {
      data: workspaceData,
    };
  }
}