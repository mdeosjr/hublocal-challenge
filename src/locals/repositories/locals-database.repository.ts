import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    try {
      await this.prisma.$transaction(async (prisma) => {
        let { responsibles, ...newLocal } = data;

        const local = await prisma.local.create({
          data: newLocal,
        });

        responsibles = data.responsibles.map((responsible) => ({
          ...responsible,
          localId: local.id,
        }));

        await prisma.responsibles.createMany({
          data: responsibles,
        });
      });
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
  }

  async getLocals(userId: number): Promise<LocalDTO[]> {
    return await this.prisma.local.findMany({
      where: {
        userId
      },
      include: {
        responsibles: true
      }
    })
  }
}
