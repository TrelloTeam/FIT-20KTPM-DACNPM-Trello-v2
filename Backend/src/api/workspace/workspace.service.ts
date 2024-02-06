import { Model } from 'mongoose'

import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas } from '@trello-v2/shared'

export abstract class IWorkspaceService {
  abstract getAllWorkspaces(): Promise<DbSchemas.WorkspaceSchema.Workspace[]>
}

export class WorkspaceService implements IWorkspaceService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[2])
    private workspaceModel: Model<DbSchemas.WorkspaceSchema.Workspace>
  ) {}
  async getAllWorkspaces() {
    return await this.workspaceModel.find().exec()
  }
}

export class WorkspaceServiceMock implements IWorkspaceService {
  getAllWorkspaces() {
    return new Promise<DbSchemas.WorkspaceSchema.Workspace[]>((resolve, reject) => {
      return resolve([])
    })
  }
}
