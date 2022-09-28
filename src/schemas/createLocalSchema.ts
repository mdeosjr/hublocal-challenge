import joi from 'joi';
import { LocalDTO } from 'src/locals/locals.dto';

const createLocalSchema = joi.object<LocalDTO>({
  name: joi.string().required(),
  address: joi.string().required(),
  companyId: joi.number().required(),
});

export default createLocalSchema;
