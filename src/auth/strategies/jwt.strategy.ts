import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../payload/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      secretOrKey: '${process.env.JWT_SECRET}',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User[]> {
    const { email } = payload;
    const user = await this.usersRepository.findBy({ email });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);
    }
    return user;
  }
}
