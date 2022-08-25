import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/dto/createUser.input';

//Request안에 user 타입을 CreateUserInput으로 덮어쓰기
interface IOAuthRequest extends Request {
  user: CreateUserInput;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/google') // 엔드 포인트
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin(req, res);
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin(req, res);
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin(req, res);
  }
}
