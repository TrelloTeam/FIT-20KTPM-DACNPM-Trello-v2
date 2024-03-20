import { ValidateGrpcInput } from '@app/common'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import z from 'zod'

const EchoRequest = z.object({
  name: z.string(),
})

@Controller()
export class CardGrpcController {
  @GrpcMethod('EchoService', 'Echo')
  echo(@ValidateGrpcInput(EchoRequest.safeParse) data: z.infer<typeof EchoRequest>) {
    return { hello: data.name }
  }
}
