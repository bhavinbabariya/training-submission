import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Order } from './order/order.entity';
import { OrderDetails } from './order/order_details.entity';
import { Product } from './product/product.entity';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB.HOST'),
        port: configService.get('DB.PORT'),
        username: configService.get('DB.USER'),
        password: configService.get('DB.PASSWORD'),
        database: configService.get('DB.NAME'),
        entities: [User, Product, Order, OrderDetails],
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: configuration,
      cache: true,
      isGlobal: true,
      envFilePath: envFilePathShouldBe(),
    }),
  ],
})
export class GlobalModule {}

function envFilePathShouldBe(): string {
  if (process.env.NODE_ENV === 'test') return '.env.test';
  else if (process.env.NODE_ENV === 'production') return '.env';
  else return '.env.local';
}
