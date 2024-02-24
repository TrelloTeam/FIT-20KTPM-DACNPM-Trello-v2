import * as Joi from 'joi'

import { configuration } from '@/config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { TestController } from './test/test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CardlistModule } from './cardlist/cardlist.module'
import { UserModule } from './user/user.module'

const EnvSchema = {
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required()
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration]
    }),
    MongooseModule.forRoot(
      'mongodb://MONGO_USER:MONGO_123@localhost:7000/trello?authSource=admin'
    ),
    CardlistModule,
    UserModule
  ],
  controllers: [AppController, TestController],
  providers: []
})
export class AppModule {}
