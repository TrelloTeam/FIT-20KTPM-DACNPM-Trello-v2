import { IRouteParams } from '@/decorators'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { getSchemaPath } from '@nestjs/swagger'

export default {
  index: 'workspace',
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, schema: { $ref: getSchemaPath('GetallWorkspaceResponse') }, isArray: true }]
    }
  }
}
