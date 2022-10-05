import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, UsePipes, Request } from '@nestjs/common';
import createLocalSchema from 'src/schemas/createLocalSchema';
import { AuthorizedRequest } from 'src/utils/authorized-request';
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
  async create(
    @Request() req: AuthorizedRequest,
    @Body() createLocalDto: LocalDTO,
  ) {
    return await this.localsService.create({
      ...createLocalDto,
      userId: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.CREATED)
  async findAll(@Request() req: AuthorizedRequest) {
    return await this.localsService.findAll(req.user.userId);
  }
}
