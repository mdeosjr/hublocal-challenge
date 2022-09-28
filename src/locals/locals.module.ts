import { Module } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { PrismaService } from 'src/database/prisma.service';
import { LocalsRepository } from './repositories/locals.repository';
import { LocalsDatabaseRepository } from './repositories/locals-database.repository';

@Module({
  controllers: [LocalsController],
  providers: [
    LocalsService,
    PrismaService,
    { provide: LocalsRepository, useClass: LocalsDatabaseRepository },
  ],
  exports: [LocalsService],
})
export class LocalsModule {}
