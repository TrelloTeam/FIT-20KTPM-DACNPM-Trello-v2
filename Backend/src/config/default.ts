import { Time } from '@/utils/constants'

export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,

    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',

    entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],

    logging: true,
    synchronize: false,
    autoLoadEntities: true
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET
  },
  swagger: {
    siteTitle: 'Basic NestJS Template | Documentation',
    title: 'Basic NestJS Template | Documentation',
    description: 'The Basic NestJS Template API Documentation',
    version: '1.0',
    bearerAuth: {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
      bearerFormat: 'Bearer',
      name: 'Authorization',
      description: 'Please enter JWT token'
    }
  },
  token: {
    authentication: {
      lifetime: 30 * Time.ONE_DAY,
      renewedTimes: 4
    }
  }
}
