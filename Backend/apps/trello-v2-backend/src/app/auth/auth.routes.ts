import { IRouteParams } from '@app/common/decorators'
import { RequestMethod } from '@nestjs/common'

export const AuthRoutes = {
  redirect: <IRouteParams>{
    path: '/api/auth/redirect',
    method: RequestMethod.GET,
  },
}
