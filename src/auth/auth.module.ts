import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/jwt/constants';
import { LocalStrategy } from 'src/utils/local/local.strategy';
import { JwtStrategy } from 'src/utils/jwt/jwt.strategy';
import { BcryptProvider } from '../utils/bcrypt/bcrypt.provider';
import { BcryptClassProvider } from '../utils/bcrypt/bcrypt-class.provider';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersDatabaseRepository } from 'src/users/repositories/users-database.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    { provide: BcryptProvider, useClass: BcryptClassProvider },
    { provide: UsersRepository, useClass: UsersDatabaseRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
