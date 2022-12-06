import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { cityNameDto } from './dto/city-name.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
