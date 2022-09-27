import * as bcrypt from 'bcrypt'
import { BcryptProvider } from './bcrypt.provider';


export class BcryptClassProvider implements BcryptProvider {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
