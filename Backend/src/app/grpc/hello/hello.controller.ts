import { Metadata, ServerUnaryCall } from '@grpc/grpc-js'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { HelloRequest } from './hello_pb'

@Controller()
export class HelloController {
  @GrpcMethod('HelloService', 'EchoHello')
  EchoHello(data: HelloService.HelloRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): HelloService.HelloMessage {
    const msg = HelloRequest.create({
      id: 1,
      name: 'abc',
    })
    return {
      id: data.id,
      message: `Hello ${data.name}`,
    }
  }
}
