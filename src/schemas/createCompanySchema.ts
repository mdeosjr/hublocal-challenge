import joi from 'joi';
import { CompanyDTO } from 'src/companies/companies.dto';

const createCompanySchema = joi.object<CompanyDTO>({
  name: joi.string().required(),
  CNPJ: joi.string().length(14).required(),
  description: joi.string().required(),
});

export default createCompanySchema;
