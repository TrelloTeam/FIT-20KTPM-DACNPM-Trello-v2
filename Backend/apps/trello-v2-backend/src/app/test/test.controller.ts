import { InjectController, InjectRoute, KeycloakAuthDecorator } from '@app/common/decorators'
import appRoutes from '../app.routes'
import { Query, Req, Res } from '@nestjs/common'
import { ZodValidationPipe } from '@app/common/pipes'
import { TestApi } from '@trello-v2/shared'
import { Request, Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'

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

  @InjectRoute(appRoutes.testUi)
  getTestUi(@Req() req: Request, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'public', 'html', 'index.html'))
    return file.pipe(res)
  }

  @InjectRoute(appRoutes.testAuthApi)
  getAuthApi(@KeycloakAuthDecorator() user: any) {
    return {
      user: user || 'No user found',
    }
  }
}
