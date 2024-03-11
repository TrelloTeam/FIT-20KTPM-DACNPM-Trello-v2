import { InjectController, ValidateGrpcInput } from '@app/common/decorators'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { TrelloApi } from '@trello-v2/shared'

import workspaceRoutes from '../workspace.routes'
import { WorkspaceService } from '../workspace.service'

@InjectController({
  name: workspaceRoutes.index,
  isCore: true,
})
export class WorkspaceMSController {
  constructor(private workspaceService: WorkspaceService) {}

  @GrpcMethod('WorkspaceService', 'getAll')
  async getAll(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const data = await this.workspaceService.getAllWorkspaces()

    if (!data) throw new NotFoundException("Can't find all of workspace")

    return { data }
  }

  @GrpcMethod('WorkspaceService', 'getAllWorkspacesByEmail')
  async getAllWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorspaceListByEmailResponse> {
    const email = 'long@gmail.com'
    const owner = (await this.workspaceService.getOwnerWorkspacesByEmail(email)) ?? []
    const admin = (await this.workspaceService.getAdminWorkspacesByEmail(email)) ?? []
    const member = (await this.workspaceService.getMemberWorkspacesByEmail(email)) ?? []
    const guest = (await this.workspaceService.getGuestWorkspacesByEmail(email)) ?? []
    // console.log({ owner, admin, member, guest })

    return {
      data: {
        owner,
        admin,
        member,
        guest,
      },
    }
  }

  @GrpcMethod('WorkspaceService', 'getWorkspaceById')
  async getWorkspaceById(
    @ValidateGrpcInput(TrelloApi.WorkspaceApi.WorkspaceIdRequestSchema.safeParse) body: TrelloApi.WorkspaceApi.WorkspaceIdRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspace = await this.workspaceService.getWorkspaceById(body._id)

    if (!workspace) throw new NotFoundException("Can't find of workspace")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'getAdminWorkspacesByEmail')
  async getAdminWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'
    const workspace = await this.workspaceService.getAdminWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's admin")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'getGuestWorkspacesByEmail')
  async getGuestWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getGuestWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's guest")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'getMemberWorkspacesByEmail')
  async getMemberWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getMemberWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's member")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'getOwnerWorkspacesByEmail')
  async getOwnerWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getOwnerWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's owner")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'getPendingWorkspacesByEmail')
  async getPendingWorkspacesByEmail(): Promise<TrelloApi.WorkspaceApi.WorkspaceListResponse> {
    const email = 'long@gmail.com'

    const workspace = await this.workspaceService.getPendingWorkspacesByEmail(email)

    if (!workspace) throw new NotFoundException("Can't find of workspace's peding")

    return { data: workspace }
  }

  @GrpcMethod('WorkspaceService', 'createWorkspace')
  async createWorkspace(
    @ValidateGrpcInput(TrelloApi.WorkspaceApi.CreateWorkspaceRequestSchema.safeParse)
    body: TrelloApi.WorkspaceApi.CreateWorspaceRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceData = await this.workspaceService.createWorkspace(body, 'long@gmail.com')

    if (!workspaceData._id) throw new InternalServerErrorException("Can't create workspace")

    return {
      data: workspaceData,
    }
  }

  @GrpcMethod('WorkspaceService', 'updateWorkspaceInfo')
  async updateWorkspaceInfo(
    @ValidateGrpcInput(TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequestSchema.safeParse)
    body: TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceUpdated = await this.workspaceService.updateWorkspaceInfo(body)

    if (!workspaceUpdated) throw new InternalServerErrorException("Can't update workspace infomation")

    return { data: workspaceUpdated }
  }

  @GrpcMethod('WorkspaceService', 'changeWorkspaceVisibility')
  async changeWorkspaceVisibility(
    @ValidateGrpcInput(TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequestSchema.safeParse)
    body: TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequest,
  ): Promise<TrelloApi.WorkspaceApi.WorspaceResponse> {
    const workspaceUpdated = await this.workspaceService.changeWorkspaceVisibility(body)

    if (!workspaceUpdated) throw new InternalServerErrorException("Can't update workspace's visibility")

    return { data: workspaceUpdated }
  }
}
