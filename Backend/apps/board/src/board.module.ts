import { Module } from '@nestjs/common'
import { BoardModule } from './app/board/board.module'
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '@app/common'
import { MongooseModule } from '@nestjs/mongoose'
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
      serveRoot: '/api/board/swagger',
      exclude: ['/api/board/swagger/index.html'],
    }),
    MongooseModule.forRoot(process.env.DB_CONN_STR || ''),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class BoardServiceModule {}
