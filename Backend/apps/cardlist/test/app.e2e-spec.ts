import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { CardlistServiceModule } from '../src/cardlist.module'

describe('CardlistController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CardlistServiceModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach((done) => {
    app.close().then(() => done())
  })

  it('/api/cardlist (GET)', () => {
    return request(app.getHttpServer()).get('/api/cardlist').expect(200)
  })
})
