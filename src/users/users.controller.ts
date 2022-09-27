import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: UserDTO) {
    return this.usersService.signUp(createUserDto);
  }
}
