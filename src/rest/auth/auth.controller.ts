import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const data = await this.authService.login(loginUserDto);
    const response = {
      data,
      message: 'Logged in',
    };
    return response;
  }

  @Get('me')
  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard) //, RoleGuard)
  async getCurrentUser(@Req() req: Request) {
    return req.user;
  }
}
