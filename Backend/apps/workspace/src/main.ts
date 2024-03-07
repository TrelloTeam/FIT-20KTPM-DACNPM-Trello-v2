import { NestFactory } from '@nestjs/core'
import { WorkspaceServiceModule } from './workspace.module'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'
import { initProtos, initSwagger } from '@app/common'
import { TrelloApi } from '@trello-v2/shared'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(process.env.DB_CONN_STR)
  const protoFolder = resolve('./../protos')
  const grpcPaths = readdirSync('./../protos')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(protoFolder, n))
  const app = await NestFactory.create(WorkspaceServiceModule)
  const grpcHost = `${process.env.GRPC_HOST || 'localhost'}:${parseInt(`${PORT}`) + 1}`

  initSwagger(app, 'api/workspace/swagger', [TrelloApi.WorkspaceApi])
  initProtos(app, grpcHost, grpcPaths, ['trello.workspace_service'])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}
bootstrap()
