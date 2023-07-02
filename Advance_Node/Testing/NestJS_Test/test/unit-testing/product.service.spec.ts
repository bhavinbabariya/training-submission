import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/users/users.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { createMock } from '@golevelup/ts-jest';

describe('ProductService', () => {
  let productService: ProductService;

  let productRepo: any;

  beforeEach(async () => {
    const productRepomock = jest.fn(() => ({
      create: jest.fn((entity) => entity),
      save: jest.fn((entity) => ({ id: 1, ...entity })),
    }));

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: TransactionService,
          useValue: createMock<TransactionService>(),
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: productRepomock,
        },
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    productRepo = moduleRef.get(getRepositoryToken(Product));
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const user: User = {
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        role: 'buyer',
      };

      const p = {
        pName: 'Parle',
        price: 100,
        quantity: 5,
        user: user,
      };

      const result = await productService.create(
        p.pName,
        p.price,
        p.quantity,
        p.user,
      );

      expect(result).toEqual({
        id: 1,
        pName: p.pName,
        price: p.price,
        quantity: p.quantity,
        userId: p.user.id,
      });

      expect(productRepo.create).toHaveBeenCalledWith(p);
      expect(productRepo.save).toHaveBeenCalledWith(p);
    });
  });
});
