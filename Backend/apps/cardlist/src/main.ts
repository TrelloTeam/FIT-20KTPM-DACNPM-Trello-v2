import { NestFactory } from '@nestjs/core'
import { CardlistServiceModule } from './cardlist.module'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'
import { TrelloApi } from '@trello-v2/shared'

import 'dotenv/config'
import { initProtos, initSwagger } from '@app/common'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(process.env.DB_CONN_STR)
  const protoFolder = resolve('./../protos')
  const grpcPaths = readdirSync('./../protos')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(protoFolder, n))

  const app = await NestFactory.create(CardlistServiceModule)
  const grpcHost = `${process.env.GRPC_HOST || 'localhost'}:${parseInt(`${PORT}`) + 1}`
  initSwagger(app, 'api/cardlist/swagger', [TrelloApi.CardlistApi, TrelloApi.CardApi])
  initProtos(app, grpcHost, grpcPaths, ['trello.card', 'trello.cardlist', 'trello.card_service'])
  await app.startAllMicroservices()
  console.log('GRPC host', grpcHost)
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}
bootstrap()
