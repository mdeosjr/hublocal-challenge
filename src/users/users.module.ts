import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserDatabaseRepository } from './repositories/users-database.repository';
import { BcryptProvider } from 'src/utils/bcrypt/bcrypt.provider';
import { BcryptClassProvider } from '../utils/bcrypt/bcrypt-class.provider';
import { UsersRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: UserDatabaseRepository },
    { provide: BcryptProvider, useClass: BcryptClassProvider },
  ],
  exports: [UsersService],
})
export class UsersModule {}
