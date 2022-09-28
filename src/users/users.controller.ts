import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import createUserSchema from 'src/schemas/createUserSchema';
import { JoiValidationPipe } from 'src/utils/joiValidationPipe';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: UserDTO) {
    return this.usersService.signUp(createUserDto);
  }
}
