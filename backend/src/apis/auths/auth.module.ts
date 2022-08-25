import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from '../../commons/auth/jwt-social-google-strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtKakaoStrategy } from '../../commons/auth/jwt-social-kakao-strategy';
import { JwtNaverStrategy } from '../../commons/auth/jwt-social-naver-strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
    AuthResolver, //
    AuthService,
    UsersService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
