import { Test } from '@nestjs/testing'
import { TrelloApi } from '@trello-v2/shared'

import { WorkspaceService } from '../workspace.service'
import { WorkspaceController } from './workspace.controller'

describe('WorkspaceController', () => {
  // let controller: WorkspaceController
  // beforeEach(async () => {
  //   const moduleRef = await Test.createTestingModule({
  //     controllers: [WorkspaceController],
  //     providers: [WorkspaceService],
  //   })
  //     .overrideProvider(WorkspaceService)
  //     .useValue(new WorkspaceServiceMock())
  //     .compile()
  //   controller = moduleRef.get(WorkspaceController)
  // })
  // describe('Workspace: Get all workspaces', () => {
  //   it('should return all workspaces', async () => {
  //     const data = await controller.getAll()
  //     expect(TrelloApi.WorkspaceApi.WorkspaceListResponseSchema.safeParse(data).success).toBeTruthy()
  //   })
  // })
})
