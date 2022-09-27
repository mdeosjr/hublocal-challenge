import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/users.dto';
import { AuthDTO } from './auth.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { BcryptProvider } from 'src/utils/bcrypt/bcrypt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcrypt: BcryptProvider,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: AuthDTO): Promise<UserDTO | null> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) return null;

    const isPayloadComparable = await this.bcrypt.comparePassword(
      password,
      user.password,
    );

    if (isPayloadComparable) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: UserDTO) {
    const data = { email: user.email, userId: user.id };

    return {
      access_token: this.jwtService.sign(data),
    };
  }
}
