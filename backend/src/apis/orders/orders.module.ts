import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    OrdersResolver, //
    OrdersService,
  ],
})
export class OrdersModule {}
