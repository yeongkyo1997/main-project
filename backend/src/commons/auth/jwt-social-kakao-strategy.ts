import { PassportStrategy } from '@nestjs/passport';
import { Strategy as KaKaoStrategy } from 'passport-kakao';
import 'dotenv/config';
import { CreateUserInput } from '../../apis/users/dto/createUser.input';

export class JwtKakaoStrategy extends PassportStrategy(KaKaoStrategy, 'kakao') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }
  // 인가 성공
  validate(_, __, profile) {
    const user: CreateUserInput = {
      email: profile._json.kakao_account.email,
      password: profile.id,
      name: profile._json.properties.nickname,
      userPhone: '01085261375',
      description: '',
    };

    return user;
  }
}
