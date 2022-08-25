import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Payment } from 'src/apis/payments/entities/payment.entity';
import { IamportService } from '../iamport/iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, //
      User,
    ]),
  ],
  providers: [
    IamportService, //
    PaymentsResolver,
    PaymentsService,
  ],
})
export class PaymentsModule {}
