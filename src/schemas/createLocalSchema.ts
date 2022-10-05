import joi from 'joi';
import { LocalDTO } from 'src/locals/locals.dto';

const createLocalSchema = joi.object<LocalDTO>({
  name: joi.string().required(),
  address: joi.string().required(),
  companyId: joi.number().required(),
  responsibles: joi.array().items(
    joi
      .object({
        name: joi.string().required(),
        phone: joi.string().required(),
        address: joi.string().required(),
      })
      .required(),
  ),
});

export default createLocalSchema;
  