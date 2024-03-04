import { InjectController, InjectRoute } from '@app/common/decorators'
import { ZodValidationPipe } from '@app/common/pipes'
import { Body, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common'
import { TrelloApi } from '@trello-v2/shared'

import workspaceRoutes from '../workspace.routes'
import { WorkspaceService } from '../workspace.service'

@InjectController({
  name: workspaceRoutes.index,
  isCore: true,
})
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @InjectRoute(workspaceRoutes.getAll)
  async getAll(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const data = await this.workspaceService.getAllWorkspaces()

    if (!data) throw new NotFoundException("Can't find all of workspace")

    return { data }
  }

  @InjectRoute(workspaceRoutes.getAllWorkspacesByEmail)
  async getAllWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorspaceListByEmailResponse> {
    const email = 'long@gmail.com'

    const owner = (await this.workspaceService.getOwnerWorkspacesByEmail(email)) ?? []
    const admin = (await this.workspaceService.getAdminWorkspacesByEmail(email)) ?? []
    const member = (await this.workspaceService.getMemberWorkspacesByEmail(email)) ?? []
    const guest = (await this.workspaceService.getGuestWorkspacesByEmail(email)) ?? []

    return {
      data: {
        owner,
        admin,
        member,
        guest,
      },
    }
  }

  @InjectRoute(workspaceRoutes.getWorkspaceById)
  async getWorkspaceById(@Param('id') id: string): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspace = await this.workspaceService.getWorkspaceById(id)

    if (!workspace) throw new NotFoundException("Can't find of workspace")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.getAdminWorkspacesByEmail)
  async getAdminWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getAdminWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's admin")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.getGuestWorkspacesByEmail)
  async getGuestWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getGuestWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's guest")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.getMemberWorkspacesByEmail)
  async getMemberWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getMemberWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's member")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.getOwnerWorkspacesByEmail)
  async getOwnerWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getOwnerWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's owner")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.getPendingWorkspacesByEmail)
  async getPendingWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getPendingWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's peding")

    return { data: workspace }
  }

  @InjectRoute(workspaceRoutes.createWorkspace)
  async createWorkspace(
    @Body(new ZodValidationPipe(TrelloApi.WorkspaceApi.CreateWorkspaceRequestSchema))
    body: TrelloApi.WorkspaceApi.CreateWorspaceRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceData = await this.workspaceService.createWorkspace(body, 'long@gmail.com')

    if (!workspaceData._id) throw new InternalServerErrorException("Can't create workspace")

    return {
      data: workspaceData,
    }
  }
  @InjectRoute(workspaceRoutes.updateWorkspaceInfo)
  async updateWorkspaceInfo(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequestSchema))
    body: TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceUpdated = await this.workspaceService.updateWorkspaceInfo(body, id)

    if (!workspaceUpdated) throw new InternalServerErrorException("Can't update workspace infomation")

    return { data: workspaceUpdated }
  }

  @InjectRoute(workspaceRoutes.changeWorkspaceVisibility)
  async changeWorkspaceVisibility(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequestSchema))
    body: TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceUpdated = await this.workspaceService.changeWorkspaceVisibility(body, id)

    if (!workspaceUpdated) throw new InternalServerErrorException("Can't update workspace's visibility")

    return { data: workspaceUpdated }
  }
}
