import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/updateUser.input';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUser.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  ////////////////////////////////QUERY////////////////////////////////////
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
  ) {
    return this.usersService.findOne({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @Context() context: any, //
  ) {
    const email = context.req.user.email;

    const user = await this.usersService.findOne({ email });

    return user;
  }
  // @Mutation(() => User)
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   const hashedPassword = await bcrypt.hash(createUserInput.password, 10.2);
  //   return this.usersService.create({
  //     createUserInput,
  //   });
  // }

  ////////////////////////////////MUTATION////////////////////////////////////

  // 비밀번호 변경
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  updateUserPwd(
    @Context() context: any, //
    @Args('password') password: string,
  ) {
    const email = context.req.user.email;
    return this.usersService.updatePwd({ email, password });
  }

  // user 생성
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { password, ...rest } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10.2);

    return this.usersService.create({
      ...rest,
      password: hashedPassword,
    });
  }

  // 로그인한 user 정보 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  updateUser(
    // @Args('email') email: string,
    @Context() context: any, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const email = context.req.user.email;
    return this.usersService.update({ email, updateUserInput });
  }

  // user 삭제
  @Mutation(() => Boolean)
  deleteUser(
    @Args('email') email: string, //
  ) {
    return this.usersService.delete({ email });
  }

  // 로그인한 user 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deteleLoginUser(
    @Context() context: any, //
  ) {
    const email = context.req.user.email;
    return this.usersService.delete({ email });
  }

  // 삭제된 user 복구
  @Mutation(() => Boolean)
  restoreUser(@Args('email') email: string) {
    return this.usersService.restore({ email });
  }
}
