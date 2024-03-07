import { configuration } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { WorkspaceModule } from './app/workspace/workspace.module'

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
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class WorkspaceServiceModule {}
