import { Module } from '@nestjs/common'
import * as Joi from 'joi'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '@app/common/config'
import { CardlistModule } from './app/cardlist/cardlist.module'
import { CardModule } from './app/card/card.module'
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
      serveRoot: '/api/cardlist/swagger',
      exclude: ['/api/cardlist/swagger/index.html'],
    }),
    MongooseModule.forRoot(process.env.DB_CONN_STR || ''),
    CardlistModule,
    CardModule,
  ],
  controllers: [],
  providers: [],
})
export class CardlistServiceModule {}
