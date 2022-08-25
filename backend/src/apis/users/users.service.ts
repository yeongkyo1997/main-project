import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  ////////////////////////////////QUERY////////////////////////////////////
  findAll() {
    return this.usersRepository.find();
  }

  findOne({ email }) {
    return this.usersRepository.findOne({
      where: { email }, //
    });
  }

  async fetchLoginUser({ email }) {
    const result = this.usersRepository.findOne({
      where: { email },
    });

    return result;
  }

  ////////////////////////////////MUTATION////////////////////////////////////

  // 생성
  async create(createUserInput) {
    // 이미 존재하는 이메일, 번호를 사용하는 경우 예외를 던진다.
    const existUser = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const result = await this.usersRepository.save(createUserInput);
    return result;
  }

  // 수정
  async update({ email, updateUserInput }) {
    const myUser = await this.usersRepository.findOne({
      where: { email },
    });

    const result = await this.usersRepository.save({
      ...myUser,
      email,
      ...updateUserInput,
    });
    return result;
  }

  // 삭제
  async delete({ email }) {
    const isValid = await this.usersRepository.findOne({ where: { email } });
    if (!isValid) {
      throw new ConflictException('존재하지 않는 이메일입니다.');
    }
    const result = await this.usersRepository.softDelete({ email });
    return result.affected ? true : false;
  }

  // 비밀번호 변경
  async updatePwd({ email, password }) {
    const myUser = await this.usersRepository.findOne({
      where: { email },
    });
    const hashedPassword = await bcrypt.hash(password, 10.2);
    const result = await this.usersRepository.save({
      ...myUser,
      password: hashedPassword,
    });
    return result;
  }

  async restore({ email }) {
    const result = await this.usersRepository.restore({ email });
    return result.affected ? true : false;
  }
}
