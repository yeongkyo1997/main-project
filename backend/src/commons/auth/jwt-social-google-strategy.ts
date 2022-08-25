import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';
import { CreateUserInput } from '../../apis/users/dto/createUser.input';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
    });
  }
  // 인가 성공
  validate(_, __, profile) {
    const user: CreateUserInput = {
      email: profile.emails[0].value, //
      password: profile.id,
      name: profile.displayName,
      userPhone: '01085261375',
      description: '',
    };
    return user;
  }
}
