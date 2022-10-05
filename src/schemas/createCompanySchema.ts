import joi from 'joi';
import { CompanyDTO } from 'src/companies/companies.dto';

const createCompanySchema = joi.object<CompanyDTO>({
  name: joi.string().required(),
  CNPJ: joi.string().length(14).required(),
  description: joi.string().required(),
  responsibles: joi.array().items(
    joi.object({
      name: joi.string().required(),
      phone: joi.string().required(),
      address: joi.string().required()
    }).required(),
  ),
});

export default createCompanySchema;
