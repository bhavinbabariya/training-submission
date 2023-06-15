import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

it('can create an instance of auth service', async () => {
  const module = await Test.createTestingModule({
    // imports: [UsersModule, JwtModule, TypeOrmModule.forFeature([User])],
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: createMock<UsersService>(),
      },
      {
        provide: JwtService,
        useValue: createMock<JwtService>(),
      },
    ],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();

  const result = service.signUp('test789@gmail.com', 'test', 'buyer');
  expect(result).toBe(
    expect.objectContaining({
      id: expect.any(Number),
      email: 'test@gmail.com',
      role: 'buyer',
    }),
  );
});
