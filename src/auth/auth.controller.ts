import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* A post request to the register endpoint. It is taking in the body of the request and assigning it
  to the regUser variable. It is returning a promise of an object with an email property. It is
  calling the registerUser function in the authService and passing in the regUser variable. */
  @Post('register')
  async registerUser(
    @Body() regUser: RegisterUserDto,
  ): Promise<{ email: string }> {
    return await this.authService.registerUser(regUser);
  }

  /* A post request to the login endpoint. It is taking in the body of the request and assigning it
    to the loginUser variable. It is returning a promise of an object with an accessToken property.
  It is
    calling the loginUser function in the authService and passing in the loginUser variable. */
  @Post('login')
  async loginUser(
    @Body() loginUser: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.loginUser(loginUser);
  }
}
