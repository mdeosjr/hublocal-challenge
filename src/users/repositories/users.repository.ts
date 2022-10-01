import { UserDTO } from '../users.dto';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserDTO | null>;
  abstract findById(userId: number): Promise<UserDTO | null>;
  abstract createUser(user: UserDTO): Promise<void>;
}
