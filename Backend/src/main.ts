import { initApplication } from '@/app'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TrelloApi } from '@trello-v2/shared'
import { ZodType } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

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
  const config = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, config)
  document.components.schemas = {
    ...document.components.schemas,
    ...GenerateSwaggerSchema(),
  }
  SwaggerModule.setup('swagger', app, document)
  const PORT = process.env.PORT || 3000
  return app.listen(PORT, () => {
    console.log(`Server are running on http://localhost:${PORT}`)
  })
}
bootstrap()
