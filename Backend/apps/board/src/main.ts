import { readdirSync } from 'fs'
import { join, resolve } from 'path'

import { initProtos, initSwagger } from '@app/common'
import { NestFactory } from '@nestjs/core'
import { TrelloApi } from '@trello-v2/shared'

import { BoardServiceModule } from './board.module'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(process.env.DB_CONN_STR)
  const protoFolder = resolve('./../protos')
  const grpcPaths = readdirSync('./../protos')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(protoFolder, n))
  const app = await NestFactory.create(BoardServiceModule)
  const grpcHost = `${process.env.GRPC_HOST || 'localhost'}:${parseInt(`${PORT}`) + 1}`

  initSwagger(app, 'api/board/swagger', [TrelloApi.BoardApi])
  initProtos(app, grpcHost, grpcPaths, ['trello.board_service'])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`board server http://localhost:${PORT}`))
}
bootstrap()
