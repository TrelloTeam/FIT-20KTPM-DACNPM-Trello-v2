// import { LocalAuthGuard } from '@/api/auth/guards'
import { IS_PUBLIC_KEY, ROLES_KEY } from '@/utils/constants'
import {
  applyDecorators,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  RequestMethod,
  SetMetadata
} from '@nestjs/common'

import { SwaggerApi } from './swagger.decorator'

import type { CustomDecorator } from '@nestjs/common'

import type { UserRole } from '@/common/enums'

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

function Public(): CustomDecorator<string> {
  return SetMetadata(IS_PUBLIC_KEY, true)
}

export function UserRoles(roles: UserRole[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles)
}

export function InjectRoute({
  path = '/',
  roles = [],
  swaggerInfo = { secure: true },
  jwtSecure = true,
  //   localSecure = false,
  code = HttpStatus.OK,
  method = RequestMethod.GET
}: IRouteParams) {
  const methodDecorator = {
    [RequestMethod.GET]: Get,
    [RequestMethod.PUT]: Put,
    [RequestMethod.POST]: Post,
    [RequestMethod.DELETE]: Delete,
    [RequestMethod.PATCH]: Patch
  }

  const decorators = [
    methodDecorator[method](path),
    HttpCode(code),
    SwaggerApi({ secure: jwtSecure, ...swaggerInfo })
  ]

  if (roles.length > 0) {
    decorators.push(UserRoles(roles))
  }

  if (!jwtSecure) {
    decorators.push(Public())
  }

  //   if (localSecure) {
  //     decorators.push(UseGuards(LocalAuthGuard))
  //   }

  return applyDecorators(...decorators)
}

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)
