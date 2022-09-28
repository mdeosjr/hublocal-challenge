import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { LocalsModule } from './locals/locals.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, CompaniesModule, LocalsModule],
  controllers: [AppController],
})
export class AppModule {}
