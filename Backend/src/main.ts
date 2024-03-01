import { initApplication } from '@/app'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TrelloApi } from '@trello-v2/shared'
import { ZodType } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { MS_MODULES } from './app/app.module'
import type { INestApplication, LogLevel } from '@nestjs/common'
import { readdirSync } from 'fs'
function GenerateSwaggerSchema() {
  const schemas: Record<string, object> = {}
  Object.values(TrelloApi).forEach((api) => {
    Object.entries(api).forEach(([name, schema]) => {
      if (schema instanceof ZodType) {
        schemas[name] = zodToJsonSchema(schema, { target: 'openApi3' })
      }
    })
  })
  return schemas
}

async function bootstrap_2() {
  const START_PORT = 4000
  const logLevels: LogLevel[] = ['error', 'log', 'warn', 'verbose', 'debug']

  const prmoiseArray: Promise<string>[] = []

  for (let i = 0; i < MS_MODULES.length; i++) {
    const app = await NestFactory.create<INestApplication>(MS_MODULES[i].module, {
      logger: logLevels,
    })
    const schemas: Record<string, object> = {}
    Object.entries(MS_MODULES[i].schema).forEach(([name, schema]) => {
      if (schema instanceof ZodType) {
        schemas[name] = zodToJsonSchema(schema, { target: 'openApi3' })
      }
    })
    const config = new DocumentBuilder().build()
    const document = SwaggerModule.createDocument(app, config)
    document.components.schemas = {
      ...document.components.schemas,
      ...schemas,
    }
    SwaggerModule.setup('swagger', app, document)

    prmoiseArray.push(
      (async function (msg: string, port: number) {
        await app.listen(port)
        return msg
      })(`${MS_MODULES[i].name} start at http://localhost:${START_PORT + i}`, START_PORT + i),
    )
  }

  const apps = await Promise.allSettled(prmoiseArray)
  apps.forEach((v) => (v.status === 'fulfilled' ? console.log(v.value) : null))
}

async function bootstrap() {
  const app = await initApplication()

  const grpcPaths = readdirSync('./../protos')
    .filter((n) => n.includes('.proto'))
    .map((n) => join(__dirname, '..', '..', 'protos', n))
  console.log(grpcPaths)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:3334',
      package: ['trello.card', 'trello.activity'],
      protoPath: grpcPaths,
      loader: { keepCase: true, arrays: true },
    },
  })
  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)
  document.components.schemas = {
    ...document.components.schemas,
    ...GenerateSwaggerSchema(),
  }
  SwaggerModule.setup('swagger', app, document)

  const PORT = process.env.PORT || 3000
  app.startAllMicroservices()
  return app.listen(PORT, () => {
    console.log(`Server are running on http://localhost:${PORT}`)
  })
}
bootstrap()
