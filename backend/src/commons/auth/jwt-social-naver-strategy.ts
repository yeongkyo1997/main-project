import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import 'dotenv/config';
import { CreateUserInput } from '../../apis/users/dto/createUser.input';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
    });
  }
  // 인가 성공
  validate(_, __, profile) {
    const user: CreateUserInput = {
      email: profile.email,
      password: profile.id,
      name: profile.name,
      userPhone: '01085261375',
      description: '',
    };
    return user;
  }
}
