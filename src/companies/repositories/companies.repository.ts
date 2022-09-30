import { PrismaPromise } from '@prisma/client';
import { CompanyDTO } from '../companies.dto';

export abstract class CompaniesRepository {
  abstract findByUserId(userId: number): Promise<CompanyDTO[] | null>;
  abstract createCompany(company: CompanyDTO): Promise<void>
}
