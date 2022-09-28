import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LocalDTO } from '../locals.dto';
import { LocalsRepository } from './locals.repository';

@Injectable()
export class LocalsDatabaseRepository implements LocalsRepository {
  constructor(private prisma: PrismaService) {}

  async findByCompanyId(companyId: number): Promise<LocalDTO[]> {
    return await this.prisma.local.findMany({
      where: {
        companyId,
      },
    });
  }

  async createLocal(data: LocalDTO): Promise<void> {
    await this.prisma.local.create({
      data,
    });
  }
}
