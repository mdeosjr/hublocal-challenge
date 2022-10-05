import { Injectable } from '@nestjs/common';
import { LocalDTO } from './locals.dto';
import { LocalsRepository } from './repositories/locals.repository';

@Injectable()
export class LocalsService {
  constructor(private readonly localsRepository: LocalsRepository) {}
  
  async create(localDTO: LocalDTO) {
    await this.localsRepository.createLocal(localDTO);
  }

  async findAll() {
    return await this.localsRepository.getLocals();
  }
}
