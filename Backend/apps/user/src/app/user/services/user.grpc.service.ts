import { Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

interface EchoInterface {
  Echo: (args: { name: string }) => { hello: string }
}
export class UserGrpcService implements OnModuleInit {
  public echoService: EchoInterface

  constructor(@Inject('ECHO_SERVICE') private client: ClientGrpc) {}
  onModuleInit() {
    this.echoService = this.client.getService<EchoInterface>('EchoService')
  }
}
