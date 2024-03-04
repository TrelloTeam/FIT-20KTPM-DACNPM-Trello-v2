import { InjectController, InjectRoute } from '@app/common/decorators'

import appRoutes from './app.routes'

@InjectController({
  name: 'core',
  isCore: true,
})
export class AppController {
  @InjectRoute(appRoutes.health)
  getHealth(): string {
    return 'Ok!'
  }
}
