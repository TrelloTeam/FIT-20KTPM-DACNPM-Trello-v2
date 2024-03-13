import { readdirSync } from 'fs'
import { join, resolve } from 'path'

import { initProtos, initSwagger } from '@app/common'
import { NestFactory } from '@nestjs/core'
import { TrelloApi } from '@trello-v2/shared'

import { BoardServiceModule } from './board.module'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(process.env.DB_CONN_STR)
  const app = await NestFactory.create(BoardServiceModule)
  initSwagger(app, 'api/board/swagger', [TrelloApi.BoardApi])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}
bootstrap()
