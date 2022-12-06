import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { BcryptEncoderService } from './bcrypt/encoder.service';
import { JwtPayload } from './payload/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly encoderService: BcryptEncoderService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * It takes a RegisterUserDto object, checks if the email is already in the database, hashes the
   * password, creates a new user, and saves it to the database
   * @param {RegisterUserDto} regUser - RegisterUserDto - this is the object that will be passed in
   * from the frontend.
   * @returns { email: dict.toCreateUser.email }
   */
  async registerUser(regUser: RegisterUserDto): Promise<{ email: string }> {
    const { email, fullName, password } = regUser;
    const foundUser = await this.usersService.findByEmail(regUser.email);
    if (foundUser) {
      throw new UnprocessableEntityException();
    }
    const hashPassword = await this.encoderService.hashPassword(password);

    const toCreateUser = this.usersRepository.create({
      email,
      fullName,
      password: hashPassword,
    });
    try {
      await this.usersRepository.save(toCreateUser);
      let dict = { toCreateUser };
      return { email: dict.toCreateUser.email };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  /**
   * It takes a user's email and password, finds the user in the database, compares the password, and
   * if the password is correct, it returns a JWT
   * @param {RegisterUserDto} loginUser - RegisterUserDto - This is the object that will be passed in
   * from the frontend.
   * @returns { accessToken: string }
   */
  async loginUser(loginUser: LoginUserDto): Promise<{ accessToken: string }> {
    const foundUser = await this.usersService.findByEmail(loginUser.email);
    const isValidPassword = await this.encoderService.comparePassword(
      loginUser.password,
      foundUser.password,
    );
    if (foundUser && (await isValidPassword)) {
      const payload: JwtPayload = { id: foundUser.id, email: foundUser.email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
