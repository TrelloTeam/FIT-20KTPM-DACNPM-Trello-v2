import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { BoardServiceModule } from './../src/board.module'

describe('BoardController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BoardServiceModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach((done) => {
    app.close().then(() => done())
  })

  it('/api/board (GET)', () => {
    return request(app.getHttpServer()).get('/api/board').expect(200)
  })
})
