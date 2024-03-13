import { Model } from 'mongoose'

import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'

export abstract class IWorkspaceService {
  abstract getWorkspaceById(workspace_id: string): Promise<DbSchemas.WorkspaceSchema.Workspace | null>
  abstract getAllWorkspaces(): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract getOwnerWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract getAdminWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract getMemberWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract getGuestWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract getPendingWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null>
  abstract createWorkspace(
    body: TrelloApi.WorkspaceApi.CreateWorspaceRequest,
    email_owner: string,
  ): Promise<DbSchemas.WorkspaceSchema.Workspace>
  abstract updateWorkspaceInfo(
    body: TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequest,
    workspace_id: string,
  ): Promise<DbSchemas.WorkspaceSchema.Workspace | null>
  abstract changeWorkspaceVisibility(
    body: TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequest,
    workspace_id: string,
  ): Promise<DbSchemas.WorkspaceSchema.Workspace | null>
  abstract deleteWorkspaceById(workspace_id: string)
}

export class WorkspaceService implements IWorkspaceService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[2])
    private readonly workspaceModel: Model<DbSchemas.WorkspaceSchema.Workspace>,
    @InjectModel(DbSchemas.COLLECTION_NAMES[4])
    private readonly memberModel: Model<DbSchemas.WorkspaceSchema.Member>,
  ) {}

  async getWorkspaceById(workspace_id: string): Promise<DbSchemas.WorkspaceSchema.Workspace | null> {
    const workspace = await this.workspaceModel.findOne({ _id: workspace_id })

    if (!workspace) return null

    return workspace
  }

  async getAllWorkspaces(): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    const workspaces = await this.workspaceModel.find().exec()

    if (!workspaces) return null

    return workspaces
  }

  async getOwnerWorkspacesByEmail(_email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    const workspaces = await this.workspaceModel.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              email: _email,
              status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.owner,
            },
          },
        },
      },
    ])

    if (!workspaces) return null
    return workspaces
  }

  async getAdminWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    const workspaces = await this.workspaceModel.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              email: email,
              status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.member,
              role: DbSchemas.WorkspaceSchema.ROLE_WORKSPACE.admin,
            },
          },
        },
      },
    ])

    if (!workspaces) return null

    return workspaces
  }

  async getMemberWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    const workspaces = await this.workspaceModel.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              email: email,
              status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.member,
              role: DbSchemas.WorkspaceSchema.ROLE_WORKSPACE.member,
            },
          },
        },
      },
    ])

    if (!workspaces) return null

    return workspaces
  }

  async getGuestWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    const workspaces = await this.workspaceModel.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              email: email,
              status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.guest,
            },
          },
        },
      },
    ])

    if (!workspaces) return null

    return workspaces
  }

  async getPendingWorkspacesByEmail(email: string): Promise<DbSchemas.WorkspaceSchema.Workspace[] | null> {
    return await this.workspaceModel.aggregate([
      {
        $match: {
          members: {
            $elemMatch: {
              email: email,
              status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.pending,
            },
          },
        },
      },
    ])
  }

  async createWorkspace(
    body: TrelloApi.WorkspaceApi.CreateWorspaceRequest,
    email_owner: string,
  ): Promise<DbSchemas.WorkspaceSchema.Workspace> {
    const owner = new this.memberModel({
      email: email_owner,
      role: DbSchemas.WorkspaceSchema.ROLE_WORKSPACE.admin,
      status: DbSchemas.WorkspaceSchema.STATUS_WORKSPACE.owner,
    })

    const newWorkspace = new this.workspaceModel({ ...body, members: [owner] })

    return await newWorkspace.save()
  }

  async changeWorkspaceVisibility(
    body: TrelloApi.WorkspaceApi.ChangeWorkspaceVisibilityRequest,
  ): Promise<DbSchemas.WorkspaceSchema.Workspace | null> {
    const res = await this.workspaceModel
      .findOneAndUpdate(
        {
          _id: body._id,
        },

        {
          $set: { ...body },
        },
        { new: true },
      )
      .exec()

    if (!res) return null

    return res.toJSON()
  }

  async updateWorkspaceInfo(body: TrelloApi.WorkspaceApi.UpdateWorkspaceInfoRequest): Promise<DbSchemas.WorkspaceSchema.Workspace | null> {
    const res = await this.workspaceModel
      .findOneAndUpdate(
        {
          _id: body._id,
        },

        {
          $set: { ...body },
        },
        { new: true },
      )
      .exec()

    if (!res) return null

    return res.toJSON()
  }

  async deleteWorkspaceById(workspace_id: string): Promise<void> {
    await this.workspaceModel.deleteOne({ _id: workspace_id })
  }
}
