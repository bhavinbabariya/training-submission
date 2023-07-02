import * as request from 'supertest';
import { faker } from '@faker-js/faker';

export async function getAccessToken(app, role) {
  const fakeEmail = faker.internet.email();

  await request(app.getHttpServer())
    .post('/auth/signup')
    .send({ email: fakeEmail, password: 'abc', role: role });

  const res = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({ email: fakeEmail, password: 'abc' });

  return res.body.access_token;
}
