import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { UserDTO } from 'src/users/users.dto';
import { LocalAuthGuard } from 'src/utils/local/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Request() req: { user: UserDTO }) {
    return this.authService.login(req.user);
  }
}
