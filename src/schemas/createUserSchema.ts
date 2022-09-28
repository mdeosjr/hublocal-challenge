import joi from 'joi';
import { UserDTO } from 'src/users/users.dto';

const createUserSchema = joi.object<UserDTO>({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

export default createUserSchema;
