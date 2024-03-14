import { readdirSync } from 'fs'
import { join, resolve } from 'path'

import { initProtos, initSwagger } from '@app/common'
import { NestFactory } from '@nestjs/core'
import { TrelloApi } from '@trello-v2/shared'

import { WorkspaceServiceModule } from './workspace.module'

async function bootstrap() {
  const PORT = process.env.PORT || 3000

  const protoFolder = resolve('./../protos')
  const grpcPaths = readdirSync('./../protos')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(protoFolder, n))
  const app = await NestFactory.create(WorkspaceServiceModule)
  const grpcHost = `${process.env.GRPC_HOST || 'localhost'}:${parseInt(`${PORT}`) + 1}`

  initSwagger(app, 'api/workspace/swagger', [TrelloApi.WorkspaceApi])
  initProtos(app, grpcHost, grpcPaths, ['trello.workspace_service'])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`workspace server http://localhost:${PORT}`))
}
bootstrap()
