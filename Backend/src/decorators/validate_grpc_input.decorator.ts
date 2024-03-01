import { BadRequestException, ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ZodObject, ZodSchema } from 'zod'

export const ValidateGrpcInput = createParamDecorator<ZodSchema['safeParse']>((safeParse, ctx: ExecutionContext) => {
  const data = ctx.switchToRpc().getData()
  // console.log('Gpc data', data)

  const grpcData = safeParse(data)
  if (grpcData.success === true) return grpcData.data
  throw new RpcException(new BadRequestException(grpcData.error))
})
