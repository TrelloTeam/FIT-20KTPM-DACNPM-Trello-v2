import { LogLevel } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

import type { INestApplication } from '@nestjs/common'

export const initApplication = async (): Promise<INestApplication> => {
  const logLevels: LogLevel[] = ['error', 'log', 'warn', 'verbose', 'debug']

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  })

  return app
}
