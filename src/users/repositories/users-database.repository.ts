import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from '../users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersDatabaseRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserDTO> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<UserDTO> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(data: UserDTO): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }
}
