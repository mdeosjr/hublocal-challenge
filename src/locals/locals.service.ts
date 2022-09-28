import { Injectable } from '@nestjs/common';
import { LocalDTO } from './locals.dto';
import { LocalsRepository } from './repositories/locals.repository';

@Injectable()
export class LocalsService {
  constructor(private readonly localsRepository: LocalsRepository) {}
  
  async create(localDTO: LocalDTO) {
    await this.localsRepository.createLocal(localDTO);
  }

  findAll() {
    return `This action returns all locals`;
  }
}
