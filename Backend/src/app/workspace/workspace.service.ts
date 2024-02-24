import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { DbSchemas, TrelloApi } from '@trello-v2/shared';

export abstract class IWorkspaceService {
  abstract getAllWorkspaces(): Promise<DbSchemas.WorkspaceSchema.Workspace[]>;
  abstract createWorkspace(body: TrelloApi.WorkspaceApi.CreateWorspaceRequest): Promise<DbSchemas.WorkspaceSchema.Workspace>;
}

export class WorkspaceService implements IWorkspaceService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[2])
    private readonly workspaceModel: Model<DbSchemas.WorkspaceSchema.Workspace>,
  ) {}
  createWorkspace(body: TrelloApi.WorkspaceApi.CreateWorspaceRequest): Promise<DbSchemas.WorkspaceSchema.Workspace> {
    const workspace = this.workspaceModel.create(body);

    return workspace;
  }
  async getAllWorkspaces() {
    return await this.workspaceModel.find().exec();
  }
}

export class WorkspaceServiceMock implements IWorkspaceService {
  getAllWorkspaces(): Promise<
    {
      name: string;
      _id: string;
      members_email: string[];
      visibility: 'private' | 'public';
      short_name: string;
      logo: string;
      owner_email: string;
      description?: string | null | undefined;
      website?: string | null | undefined;
      type_id?: string | null | undefined;
    }[]
  > {
    throw new Error('Method not implemented.');
  }
  createWorkspace(data: TrelloApi.WorkspaceApi.CreateWorspaceRequest): Promise<{
    name: string;
    _id: string;
    members_email: string[];
    visibility: 'private' | 'public';
    short_name: string;
    logo: string;
    owner_email: string;
    description?: string | null | undefined;
    website?: string | null | undefined;
    type_id?: string | null | undefined;
  }> {
    throw new Error('Method not implemented.');
  }
}
