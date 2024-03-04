import { InjectModel } from '@nestjs/mongoose'
import { DbSchemas, TrelloApi } from '@trello-v2/shared'
import { Model } from 'mongoose'

export class UserService {
  constructor(
    @InjectModel(DbSchemas.COLLECTION_NAMES[3])
    private UserMModel: Model<DbSchemas.UserSchema.User>,
  ) {}

  async createUser(data: TrelloApi.UserApi.CreateUserRequest) {
    const model = new this.UserMModel(data)
    return model.save()
  }

  async getAllUser() {
    return this.UserMModel.find().exec()
  }

  async getUser(id: number | string) {
    return this.UserMModel.findById(id)
  }

  async updateUser(id: number | string, data: TrelloApi.UserApi.UpdateUserRequest) {
    const user = await this.UserMModel.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { upsert: true, new: true },
    )

    if (!user) return null

    return user.toJSON()
  }
}
