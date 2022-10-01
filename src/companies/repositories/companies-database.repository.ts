import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
      include: {
        responsibles: true,
      },
    });
  }

  async findByCNPJ(CNPJ: string): Promise<CompanyDTO> {
    return await this.prisma.company.findUnique({
      where: {
        CNPJ
      }
    })
  }

  async createCompany(data: CompanyDTO): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        let { responsibles, ...newCompany } = data;

        const company = await prisma.company.create({
          data: newCompany,
        });

        responsibles = data.responsibles.map((responsible) => ({
          ...responsible,
          companyId: company.id,
        }));

        await prisma.responsibles.createMany({
          data: responsibles,
        });
      });
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }
}
