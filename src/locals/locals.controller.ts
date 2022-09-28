import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, UsePipes } from '@nestjs/common';
import createLocalSchema from 'src/schemas/createLocalSchema';
import { JoiValidationPipe } from 'src/utils/joiValidationPipe';
import { JwtAuthGuard } from 'src/utils/strategies/jwt/jwt.guard';
import { LocalDTO } from './locals.dto';
import { LocalsService } from './locals.service';

@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createLocalSchema))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLocalDto: LocalDTO) {
    return this.localsService.create(createLocalDto);
  }

  @Get()
  findAll() {
    return this.localsService.findAll();
  }
}
