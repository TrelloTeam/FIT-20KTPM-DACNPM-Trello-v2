import { initApplication } from '@/app'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TrelloApi } from '@trello-v2/shared'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { ZodType } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

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

async function bootstrap() {
  const app = await initApplication()
  const grpcPath = join(__dirname, '..', '..', 'grpc', 'hello.proto')
  console.log(grpcPath)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:3334',
      package: 'hello',
      protoPath: grpcPath,
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
