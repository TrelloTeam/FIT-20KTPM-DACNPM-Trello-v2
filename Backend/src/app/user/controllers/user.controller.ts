import { InjectController, InjectRoute } from '@/decorators'
import { UserService } from '../services/user.service'
import { UserRoutes } from '../user.routes'
import { Body, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes'
import { TrelloApi } from '@trello-v2/shared'
import { SwaggerApi } from '@/decorators/swagger.decorator'
import { getSchemaPath } from '@nestjs/swagger'

@InjectController({
  name: 'user',
  isCore: true,
})
export class UserController {
  constructor(private userService: UserService) {}

  @InjectRoute(UserRoutes.createUser)
  @SwaggerApi({
    secure: false,
    body: {
      schema: { $ref: getSchemaPath('CreateUserRequestSchema') },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('CreateUserResponseSchema') },
      },
    ],
  })
  async createUser(
    @Body(new ZodValidationPipe(TrelloApi.UserApi.CreateUserRequestSchema))
    body: TrelloApi.UserApi.CreateUserRequest,
  ): Promise<TrelloApi.UserApi.CreateUserResponse> {
    const user = await this.userService.createUser(body)
    if (!user || !user._id) throw new InternalServerErrorException("Can't create user")
    return {
      data: user,
    }
  }

  @InjectRoute(UserRoutes.getAllUser)
  @SwaggerApi({
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('GetallUserResponseSchema') },
      },
    ],
  })
  async getAll(): Promise<TrelloApi.UserApi.GetallUserResponse> {
    const data = await this.userService.getAllUser()
    return {
      data: data,
    }
  }

  @InjectRoute(UserRoutes.updateUser)
  @SwaggerApi({
    params: {
      name: 'id',
      schema: {
        type: 'string',
      },
    },
    body: {
      schema: { $ref: getSchemaPath('UpdateUserRequestSchema') },
    },
    responses: [
      {
        status: 200,
        schema: { $ref: getSchemaPath('UpdateUserResponseSchema') },
      },
    ],
  })
  async updateUser(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(TrelloApi.UserApi.UpdateUserRequestSchema))
    body: TrelloApi.UserApi.UpdateUserRequest,
  ): Promise<TrelloApi.UserApi.UpdateUserResponse> {
    const user = await this.userService.updateUser(id, body)
    if (!user) throw new NotFoundException("Can't find user")

    return {
      data: {
        ...user,
        _id: user._id,
      },
    }
  }
}
