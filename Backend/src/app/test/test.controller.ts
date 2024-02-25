import { InjectController, InjectRoute } from '@/decorators'
import appRoutes from '../app.routes'
import { Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TestApi } from '@trello-v2/shared'

@InjectController({
  name: 'core',
  isCore: true,
})
export class TestController {
  @InjectRoute(appRoutes.testApi)
  getTestApi(
    @Query(new ZodValidationPipe(TestApi.TestApiQuerySchema))
    query: TestApi.TestApiQuery,
  ): TestApi.TestApiResponse {
    return {
      Hello: query.name,
    }
  }
}
