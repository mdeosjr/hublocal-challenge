import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from '../users.dto';
import { User } from '../users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UserDatabaseRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDTO> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: User): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }
}
