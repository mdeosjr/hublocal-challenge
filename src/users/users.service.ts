import { ConflictException, Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersRepository } from './repositories/users.repository';
import { BcryptProvider } from 'src/utils/bcrypt/bcrypt.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcrypt: BcryptProvider,
  ) {}

  async signUp(createUserDto: UserDTO): Promise<void> {
    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    createUserDto.password = await this.bcrypt.hashPassword(password);
    await this.usersRepository.createUser(createUserDto);
  }
}
