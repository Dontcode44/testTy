import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() regUser: RegisterUserDto,
  ): Promise<{ email: string }> {
    return await this.authService.registerUser(regUser);
  }

  @Post('login')
  async loginUser(
    @Body() loginUser: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.loginUser(loginUser);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.authService.getAllUsers();
  }
}
