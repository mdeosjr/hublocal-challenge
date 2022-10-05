import { LocalDTO } from '../locals.dto';

export abstract class LocalsRepository {
  abstract findByCompanyId(userId: number): Promise<LocalDTO[] | null>;
  abstract createLocal(company: LocalDTO): Promise<void>;
  abstract getLocals(): Promise<LocalDTO[]>;
}
