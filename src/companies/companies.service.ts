import { Injectable } from '@nestjs/common';
import { CompanyDTO } from './companies.dto';
import { CompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async create(companyDTO: CompanyDTO) {
    await this.companiesRepository.createCompany(companyDTO);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
