import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validateUser(loginDTO: AuthDTO): Promise<UserDTO | null> {
    const { email, password } = loginDTO;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('User does not exist');

    const isPasswordComparable = await this.bcrypt.comparePassword(
      password,
      user.password,
    );

    if (isPasswordComparable) {
      delete user.password;
      return user;
    }

    return null
  }

  async login(user: UserDTO) {
    const data = { email: user.email, userId: user.id };

    return {
      name: user.name,
      access_token: this.jwtService.sign(data),
    };
  }
}
