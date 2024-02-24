import { InjectController, InjectRoute } from '@/decorators'
import { AuthRoutes } from '../auth.routes'
import { Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@InjectController({
  name: 'auth',
  isCore: true
})
export class AuthController {
  @InjectRoute(AuthRoutes.redirect)
  redirect(@Req() req: Request, @Res() res: Response) {
    return res.redirect('/ui/test')
    return res.json({
      headers: req.headers,
      query: req.query,
      params: req.params,
      url: req.originalUrl
    })
  }
}
