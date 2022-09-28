import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CompaniesRepository } from './companies.repository';
import { CompanyDTO } from '../companies.dto';

@Injectable()
export class CompaniesDatabaseRepository implements CompaniesRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: number): Promise<CompanyDTO[]> {
    return await this.prisma.company.findMany({
      where: {
        userId,
      },
    });
  }

  async createCompany(data: CompanyDTO): Promise<void> {
    await this.prisma.company.create({
      data,
    });
  }
}
