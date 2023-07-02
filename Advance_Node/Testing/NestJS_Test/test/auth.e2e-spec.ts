import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { setupDB } from './fixtures/setupDB';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await setupDB(moduleFixture);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /auth/signup', () => {
    it('user should signup successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'test@gmail.com', password: 'pass', role: 'buyer' })
        .expect(201)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            email: 'test@gmail.com',
            role: 'buyer',
          });
        });
    });

    it('user should not signup because of user already exists', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'test@gmail.com', password: 'pass', role: 'buyer' })
        .expect(400)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: 'User with given email is already exists',
            statusCode: 400,
          });
        });
    });
  });

  describe('POST /auth/signin', () => {
    it('user should signin successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'test@gmail.com', password: 'pass' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            access_token: expect.any(String),
          });
        });
    });

    it('user should not signin because of wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'test@gmail.com', password: 'pass1' })
        .expect(401)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            message: 'Unauthorized',
            statusCode: 401,
          });
        });
    });
  });
});
