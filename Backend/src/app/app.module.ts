import * as Joi from 'joi'

import { configuration } from '@/config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { TestController } from './test/test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CardlistModule } from './cardlist/cardlist.module'
import { BoardModule } from './board/board.module'
import { WorkspaceModule } from './workspace/workspace.module'
import { CardModule } from './card/card.module'
import { AuthModule } from './auth/auth.module'
import { Transport } from '@nestjs/microservices'
import { ZodType } from 'zod'
import { TrelloApi } from '@trello-v2/shared'

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
  JWT_REFRESH_SECRET: Joi.string().required(),
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://MONGO_USER:MONGO_123@localhost:7000/trello?authSource=admin'),
    CardlistModule,
    WorkspaceModule,
    UserModule,
    BoardModule,
    CardModule,
    AuthModule,
  ],
  controllers: [AppController, TestController],
  providers: [],
})
export class AppModule {}

type MSModuleType = {
  name: string
  module: any
  schema: { [key: string]: ZodType }
}

function GenerateMSModule(...modules: any[]) {
  @Module({
    imports: [
      ConfigModule.forRoot({
        validationSchema: Joi.object().keys(EnvSchema),
        load: [configuration],
      }),
      MongooseModule.forRoot('mongodb://MONGO_USER:MONGO_123@localhost:7000/trello?authSource=admin'),
      ...modules,
    ],
  })
  class MS {}
  return MS
}

export const MS_MODULES: MSModuleType[] = [
  { name: 'Card module', module: GenerateMSModule(CardModule), schema: TrelloApi.CardApi },
  { name: 'Cardlist module', module: GenerateMSModule(CardlistModule), schema: TrelloApi.CardlistApi },
  { name: 'User module', module: GenerateMSModule(UserModule), schema: TrelloApi.UserApi },
  { name: 'Workspace module', module: GenerateMSModule(WorkspaceModule), schema: TrelloApi.WorkspaceApi },
  { name: 'Board module', module: GenerateMSModule(BoardModule), schema: TrelloApi.BoardApi },
]
