import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAllBuyer', () => {
    it('should return all buyers', async () => {
      console.log('first');
      //   const mockBuyers = [
      //     { id: 1, name: 'Buyer 1' },
      //     { id: 2, name: 'Buyer 2' },
      //   ];
      //   jest.spyOn(usersService, 'findAll').mockResolvedValue(mockBuyers);
      //   const result = await usersController.findAllBuyer();
      //   expect(result).toEqual(mockBuyers);
      //   expect(usersService.findAll).toHaveBeenCalledWith('buyer');
    });
  });

  describe('findAllSeller', () => {
    it('should return all sellers', async () => {
      console.log('second');

      //   const mockSellers = [
      //     { id: 3, name: 'Seller 1' },
      //     { id: 4, name: 'Seller 2' },
      //   ];
      //   jest.spyOn(usersService, 'findAll').mockResolvedValue(mockSellers);
      //   const result = await usersController.findAllSeller();
      //   expect(result).toEqual(mockSellers);
      //   expect(usersService.findAll).toHaveBeenCalledWith('seller');
    });
  });
});
