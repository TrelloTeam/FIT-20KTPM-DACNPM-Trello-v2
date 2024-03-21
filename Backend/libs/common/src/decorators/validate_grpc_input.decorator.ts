import { ZodSchema } from 'zod'

import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export const ValidateGrpcInput = createParamDecorator<ZodSchema['safeParse']>((safeParse, ctx: ExecutionContext) => {
  const data = ctx.switchToRpc().getData()
  console.log('Gpc data', data)

  const grpcData = safeParse(data)
  if (grpcData.success === true) return grpcData.data

  throw new RpcException(new BadRequestException(grpcData.error))
})
