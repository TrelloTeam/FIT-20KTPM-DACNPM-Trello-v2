import path from 'path';

import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';

export default {
  index: 'workspace',
  getAll: <IRouteParams>{
    path: '/api/workspace',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('GetAllWorkspaceResponse') }, isArray: true }],
    },
  },
  createWorkspace: <IRouteParams>{
    path: '/api/worspace',
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('CreateWorspaceResponseSchema') } }],
    },
  },
  updateWorkspaceInfo: <IRouteParams>{
    path: '/api/worspace/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
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
};
