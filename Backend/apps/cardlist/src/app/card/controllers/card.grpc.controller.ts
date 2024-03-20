import { ValidateGrpcInput } from '@app/common'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { TestGrpc } from '@app/common'

@Controller()
export class CardGrpcController {
  @GrpcMethod('EchoService', 'Echo')
  echo(@ValidateGrpcInput(TestGrpc.EchoRequestSchema.safeParse) data: TestGrpc.EchoRequest) {
    return { hello: data.name }
  }
}
