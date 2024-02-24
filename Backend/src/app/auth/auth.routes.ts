import { IRouteParams } from '@/decorators'
import { RequestMethod } from '@nestjs/common'

export const AuthRoutes = {
  redirect: <IRouteParams>{
    path: '/api/auth/redirect',
    method: RequestMethod.GET
  }
}
