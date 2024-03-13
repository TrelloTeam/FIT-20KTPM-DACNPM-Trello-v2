import { NestFactory } from '@nestjs/core'
import { WorkspaceServiceModule } from './workspace.module'
import { join, resolve } from 'path'
import { readdirSync } from 'fs'
import { initProtos, initSwagger } from '@app/common'
import { TrelloApi } from '@trello-v2/shared'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(WorkspaceServiceModule)
  initSwagger(app, 'api/workspace/swagger', [TrelloApi.WorkspaceApi])
  await app.startAllMicroservices()
  await app.listen(PORT, () => console.log(`Cardlist server http://localhost:${PORT}`))
}
bootstrap()
