import { NestFactory } from '@nestjs/core'
import { CardlistServiceModule } from './cardlist.module'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'
import { TrelloApi, DbSchemas } from '@trello-v2/shared'

import 'dotenv/config'
import { initProtos, initSwagger } from '@app/common'

import { z } from 'zod'

const FeatureDataSchema = z.discriminatedUnion('type', [
  DbSchemas.FeatureSchema.FeatureLabelSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureChecklistSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureDateSchema.omit({ _id: true }),
  DbSchemas.FeatureSchema.FeatureAttachmentSchema.omit({ _id: true }),
])

console.log(FeatureDataSchema.array().parse([{ type: 'attachment', link: 'abc.com', _id: '123' }]))

export default async function bootstrap() {
  const GRPC_HOST = process.env.GRPC_HOST || 'localhost'
  const PORT = process.env.PORT || '3000'
  const GRPC_PORT = parseInt(PORT) + 1
  console.log(process.env.DB_CONN_STR)
  const app = await NestFactory.create(CardlistServiceModule)
  initSwagger(app, 'api/cardlist/swagger', [TrelloApi.CardlistApi, TrelloApi.CardApi])

  const grpcPaths = readdirSync('./protos/test')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(process.cwd(), 'protos', 'test', n))
  console.log(grpcPaths)
  initProtos(app, `${GRPC_HOST}:${GRPC_PORT}`, grpcPaths, ['trello.test'])

  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}
bootstrap()
