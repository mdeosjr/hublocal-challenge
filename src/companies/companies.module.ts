import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesRepository } from './repositories/companies.repository';
import { CompaniesDatabaseRepository } from './repositories/companies-database.repository';

@Module({
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    PrismaService,
    { provide: CompaniesRepository, useClass: CompaniesDatabaseRepository },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
