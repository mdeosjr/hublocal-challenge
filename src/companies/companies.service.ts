import { Injectable } from '@nestjs/common';
import { CompanyDTO } from './companies.dto';
import { CompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async create(companyDTO: CompanyDTO) {
    await this.companiesRepository.createCompany(companyDTO);
  }

  async getCompaniesByUserId(userId: number) {
    return await this.companiesRepository.findByUserId(userId);
  }
}
