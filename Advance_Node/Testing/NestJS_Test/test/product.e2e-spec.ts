import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { getAccessToken } from './fixtures/getAccessToken';
import { setupDB } from './fixtures/setupDB';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await setupDB(moduleFixture);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // await app.close();
  });

  describe('POST /product/create', () => {
    test('should product created successfully', async () => {
      const access_token = await getAccessToken(app, 'seller');

      return request(app.getHttpServer())
        .post('/product/create')
        .set('authorization', `Bearer ${access_token}`)
        .send({ pName: 'Parle', price: 100, quantity: 5 })
        .expect(201)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            pName: 'Parle',
            price: 100,
            quantity: 5,
            userId: expect.any(Number),
          });
        });
    });

    test('should not create product because of buyer roll', async () => {
      const access_token = await getAccessToken(app, 'buyer');

      return request(app.getHttpServer())
        .post('/product/create')
        .send({ pName: 'Parle', price: 100, quantity: 5 })
        .set('authorization', `Bearer ${access_token}`)
        .expect(401)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Not Permission to access other resource',
          });
        });
    });
  });
});
