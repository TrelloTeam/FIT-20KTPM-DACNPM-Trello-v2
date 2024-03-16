import { NestFactory } from '@nestjs/core'
import { CardlistServiceModule } from './cardlist.module'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'
import { TrelloApi } from '@trello-v2/shared'

import 'dotenv/config'
import { initProtos, initSwagger } from '@app/common'

export default async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(process.env.DB_CONN_STR)
  const app = await NestFactory.create(CardlistServiceModule)
  initSwagger(app, 'api/cardlist/swagger', [TrelloApi.CardlistApi, TrelloApi.CardApi])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}

bootstrap()
