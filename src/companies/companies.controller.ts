import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Body,
  UsePipes,
  Get,
} from '@nestjs/common';
import createCompanySchema from 'src/schemas/createCompanySchema';
import { AuthorizedRequest } from 'src/utils/authorized-request';
import { JoiValidationPipe } from 'src/utils/joiValidationPipe';
import { JwtAuthGuard } from 'src/utils/strategies/jwt/jwt.guard';
import { CompanyDTO } from './companies.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createCompanySchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: AuthorizedRequest, @Body() company: CompanyDTO) {
    await this.companiesService.create({ ...company, userId: req.user.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async fetchCompanies(@Request() req: AuthorizedRequest) {
    return this.companiesService.getCompaniesByUserId(req.user.userId);
  }
}
