import { ConflictException, Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersRepository } from './repositories/users.repository';
import { BcryptProvider } from 'src/utils/bcrypt/bcrypt.provider';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcrypt: BcryptProvider,
  ) {}

  async signUp(createUserDto: UserDTO): Promise<void> {
    const { name, email, password } = createUserDto;

    const user = new User(name, email, password);

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException();
    }

    user.password = await this.bcrypt.hashPassword(password);
    await this.usersRepository.createUser(user);
  }
}
