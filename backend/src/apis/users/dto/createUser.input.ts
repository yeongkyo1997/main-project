import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  userPhone: string;

  // nullable
  @Field(() => String, { nullable: true })
  description: string;
}
