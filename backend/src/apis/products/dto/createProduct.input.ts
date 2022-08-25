import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  level: string;

  @Field(() => Float)
  starRate: number;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  isDiploma: boolean;

  @Field(() => String)
  subCategoryId: string;

  @Field(() => String)
  userId: string;

  // @Field(() => String)
  // paymentId: string;

  @Field(() => [String])
  tags: string[];
}
