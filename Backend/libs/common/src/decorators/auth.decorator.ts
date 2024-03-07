import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common'
import axios from 'axios'

const KeyCloakHost = 'localhost'
const KeyCloakPort = '8090'
const KeyCloakRealm = 'trello_app'

export const KeycloakAuthDecorator = createParamDecorator(async (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const token = request.headers?.authorization
  if (!token || typeof token !== 'string') throw new UnauthorizedException('Missing token')
  const url = `http://${KeyCloakHost}:${KeyCloakPort}/realms/${KeyCloakRealm}/protocol/openid-connect/userinfo`
  const response = await axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: token,
    },
    validateStatus: () => true,
  })

  return response.data
})
