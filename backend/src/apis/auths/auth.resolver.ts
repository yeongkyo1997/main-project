import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthRefreshGuard } from '../../commons/auth/gql-auth.guard';
import { IContext } from '../../commons/type/context';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly usersService: UsersService, //
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    // 1. 로그인(이메일이 일치하는 사용자를 찾는다)
    const user = await this.usersService.findOne({ email });

    // 2. 일치하는 유저가 업으면!? 에러 발생
    if (!user) {
      throw new UnprocessableEntityException('존재하지 않는 이메일입니다.');
    }

    // 3. 일치하는 유저가 있지만, 비밀번호가 일치하지 않으면!? 에러 발생
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }
    // 4. 일치하는 유저가 있고, 비밀번호가 일치하면?!
    this.authService.setRefreshToken({ user, res: context.res });

    // => accessToken(= JWT)를 만들어서 브라우저에 전달한다.
    return this.authService.getAccessToken({ user });
  }

  // 리프레시 토큰 생성
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authService.getAccessToken({ user: context.req.user });
  }

  /**
   *
   * verifyToken은 인증이 되어있는지 확인하는 것이기 때문에
   * 가드를 사용하지 않아도 된다.
   */
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    const accessToken = context.req.headers['authorization'].split(' ')[1];
    const refreshToken = context.req.headers['cookie'].split('=')[1];

    /**
     * 인증이 되었는지 확인하는 로직
     */
    try {
      jwt.verify(accessToken, 'myAccessKey');
      jwt.verify(refreshToken, 'myRefreshKey');
    } catch {
      throw new UnauthorizedException();
    }

    /**
     * 캐시에서 토큰을 삭제하는 로직
     * 토큰의 유효시간에 맞게 ttl을 설정해줬다.
     */
    await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
      ttl: 60 * 60, // 1시간
    });
    await this.cacheManager.set(
      `refreshToken:${refreshToken}`,
      'refreshToken',
      {
        ttl: 60 * 60 * 24 * 7 * 2, // 2주
      },
    );
    return '로그아웃에 성공했습니다.';
  }
}
