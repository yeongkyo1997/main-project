import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  // @Field(() => String)
  password: string;

  @DeleteDateColumn()
  // @Field(() => String)
  deletedAt?: Date;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  userPhone: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ nullable: true })
  @Field(() => String)
  description?: string;
}
