import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PayMethod } from 'src/apis/payMethod/entities/payMethod.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PAYMENT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCELLED = 'CANCELLED',
}

registerEnumType(PAYMENT_TRANSACTION_STATUS_ENUM, {
  name: 'PAYMENT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Number)
  amount: number;

  @Column({ type: 'enum', enum: PAYMENT_TRANSACTION_STATUS_ENUM })
  @Field(() => PAYMENT_TRANSACTION_STATUS_ENUM)
  status: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => PayMethod)
  @Field(() => PayMethod)
  payMethod: PayMethod;
}
