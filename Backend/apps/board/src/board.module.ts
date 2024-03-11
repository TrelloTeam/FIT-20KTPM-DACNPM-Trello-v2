import { Module } from '@nestjs/common'
import { BoardModule } from './app/board/board.module'
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '@app/common'
import { MongooseModule } from '@nestjs/mongoose'

const EnvSchema = {
  PORT: Joi.number(),
  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  DB_CONN_STR: Joi.string().required(),
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DB_CONN_STR || ''),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class BoardServiceModule {}
