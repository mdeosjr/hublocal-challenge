import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CompanyDTO } from './companies.dto';
import { CompaniesRepository } from './repositories/companies.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companiesRepository: CompaniesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(companyDTO: CompanyDTO) {
    const company = await this.companiesRepository.findByCNPJ(companyDTO.CNPJ)
    if(company) throw new ConflictException('Company already registered')

    await this.companiesRepository.createCompany(companyDTO);
  }

  async getCompaniesByUserId(userId: number) {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new NotFoundException('User not found')

    const companies = await this.companiesRepository.findByUserId(userId);

    return companies;
  }
}
