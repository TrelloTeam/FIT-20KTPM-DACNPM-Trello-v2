import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Patch, Post, Put, RequestMethod } from '@nestjs/common'

import { SwaggerApi } from './swagger.decorator'

import type { UserRole } from '@app/common'

import type { ISwaggerParams } from './swagger.decorator'

export interface IRouteParams {
  path: string
  code?: number
  method: number
  roles?: UserRole[]
  jwtSecure?: boolean
  localSecure?: boolean
  swaggerInfo?: ISwaggerParams
}

export function InjectRoute({ path = '/', swaggerInfo = {}, code = HttpStatus.OK, method = RequestMethod.GET }: IRouteParams) {
  const methodDecorator = {
    [RequestMethod.GET]: Get,
    [RequestMethod.PUT]: Put,
    [RequestMethod.POST]: Post,
    [RequestMethod.DELETE]: Delete,
    [RequestMethod.PATCH]: Patch,
  }

  const decorators = [methodDecorator[method](path), HttpCode(code), SwaggerApi({ ...swaggerInfo })]

  return applyDecorators(...decorators)
}
