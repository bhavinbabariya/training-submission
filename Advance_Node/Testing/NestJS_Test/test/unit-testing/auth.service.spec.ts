import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService Unit Test Case', () => {
  let authService: AuthService, usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest
              .fn()
              .mockResolvedValue('algoHash.objHash.digitalSign'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signup', () => {
    it('should signup successfully', async () => {
      const user: User = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        role: 'buyer',
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      const result = await authService.signUp(
        user.email,
        user.password,
        user.role,
      );

      expect(result).toEqual({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
      expect(usersService.create).toHaveBeenCalledWith(
        user.email,
        expect.any(String),
        user.role,
      );
    });

    it('should not signup successfully', async () => {
      const user: User = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        role: 'buyer',
      };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user);

      await expect(
        authService.signUp(user.email, user.password, user.role),
      ).rejects.toThrow(HttpException);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
    });
  });

  describe('signin', () => {
    it('should signin successfully', async () => {
      const user: User = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        role: 'buyer',
      };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.signIn(user.email, user.password);

      expect(result).toEqual({ access_token: 'algoHash.objHash.digitalSign' });

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
    });

    it('should not signin successfully', async () => {
      const user: User = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        role: 'buyer',
      };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      await expect(
        authService.signIn(user.email, user.password),
      ).rejects.toThrow(UnauthorizedException);

      expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
    });
  });
});
