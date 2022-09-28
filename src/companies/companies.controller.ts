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
  create(@Request() @Body() req: AuthorizedRequest, company: CompanyDTO) {
    return this.companiesService.create({ ...company, userId: req.userId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  fetchCompanies(@Request() req: AuthorizedRequest) {
    return this.companiesService.getCompaniesByUserId(req.userId);
  }
}
