import { IRouteParams } from '@app/common/decorators'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { getSchemaPath } from '@nestjs/swagger'

export default {
  index: 'workspace',
  getAll: <IRouteParams>{
    path: '/api/workspace',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getWorkspaceById: <IRouteParams>{
    path: '/api/workspace/:id',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('') }, isArray: true }],
    },
  },
  getAllWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/all/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getOwnerWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/owner/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getAdminWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/admin/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getMemberWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/member/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getGuestWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/guest/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  getPendingWorkspacesByEmail: <IRouteParams>{
    path: '/api/workspace/pending/:email',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('WorkspaceListResponse') }, isArray: true }],
    },
  },
  createWorkspace: <IRouteParams>{
    path: '/api/worspace',
    method: RequestMethod.POST,
    swaggerInfo: {
      body: {
        schema: { $ref: getSchemaPath('CreateWorkspaceRequestSchema') },
      },
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('CreateWorspaceResponseSchema') } }],
    },
  },
  updateWorkspaceInfo: <IRouteParams>{
    path: '/api/worspace/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
      body: {
        schema: { $ref: getSchemaPath('UpdateWorkspaceInfoRequestSchema') },
      },
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('UpdateWorkspaceInfoResponseSchema') } }],
    },
  },
  changeWorkspaceVisibility: <IRouteParams>{
    path: '/api/worspace/visibility/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('UpdateWorkspaceInfoResponseSchema') } }],
    },
  },
}
