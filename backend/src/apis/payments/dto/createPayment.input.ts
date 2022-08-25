import { Field, InputType, Int } from '@nestjs/graphql';
import { PAYMENT_TRANSACTION_STATUS_ENUM } from '../entities/payment.entity';
import { User } from '../../users/entities/user.entity';
import { PayMethod } from '../../payMethod/entities/payMethod.entity';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int)
  totalPrice: number;

  @Field(() => PAYMENT_TRANSACTION_STATUS_ENUM)
  status: PAYMENT_TRANSACTION_STATUS_ENUM;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => PayMethod)
  PayMethod: PayMethod;
}
