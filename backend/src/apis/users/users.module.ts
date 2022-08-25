import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from 'src/apis/users/entities/user.entity';
import { JwtAccessStrategy } from '../../commons/auth/jwt-access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy, //
    UsersResolver,
    UsersService,
  ],
})
export class UsersModule {}
