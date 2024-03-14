import { configuration } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { WorkspaceModule } from './app/workspace/workspace.module'
import { ServeStaticModule } from '@nestjs/serve-static'

const EnvSchema = {
  PORT: Joi.number(),
  DB_CONN_STR: Joi.string().required(),
}
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object().keys(EnvSchema),
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: './public',
      serveRoot: '/api/workspace/swagger',
      exclude: ['/api/workspace/swagger/index.html'],
    }),
    MongooseModule.forRoot(process.env.DB_CONN_STR || ''),
    WorkspaceModule,
  ],
  controllers: [],
  providers: [],
})
export class WorkspaceServiceModule {}
