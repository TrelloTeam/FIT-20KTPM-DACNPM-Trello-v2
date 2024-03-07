import { InjectController, ValidateGrpcInput } from '@app/common/decorators'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { TrelloApi } from '@trello-v2/shared'
import { UserService } from '../services/user.service'

@InjectController({
  name: 'user',
  isCore: true,
})
export class UserMSController {
  constructor(private userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(
    @ValidateGrpcInput(TrelloApi.UserApi.CreateUserRequestSchema.safeParse)
    body: TrelloApi.UserApi.CreateUserRequest,
  ): Promise<TrelloApi.UserApi.CreateUserResponse> {
    const user = await this.userService.createUser(body)
    if (!user || !user._id) throw new InternalServerErrorException("Can't create user")
    return {
      data: user,
    }
  }

  @GrpcMethod('UserService', 'GetAll')
  async getAll(): Promise<TrelloApi.UserApi.GetallUserResponse> {
    const data = await this.userService.getAllUser()
    return {
      data: data,
    }
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(
    @ValidateGrpcInput(TrelloApi.UserApi.UpdateUserRequestSchemaProto.safeParse)
    body: TrelloApi.UserApi.UpdateUserRequestProto,
  ): Promise<TrelloApi.UserApi.UpdateUserResponse> {
    const user = await this.userService.updateUser(body._id, body)
    if (!user) throw new NotFoundException("Can't find user")

    return {
      data: {
        ...user,
        _id: user._id,
      },
    }
  }
}
