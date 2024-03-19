import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { WorkspaceServiceModule } from './../src/workspace.module'

describe('WorkspaceController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WorkspaceServiceModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach((done) => {
    app.close().then(() => done())
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })
})
