import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesService } from 'src/cities/cities.service';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * We're using the createQueryBuilder() method to create a query that will find a user by their
   * email.
   *
   * If the user is not found, we throw a 404 error.
   *
   * If the user is found, we return the user.
   * @param {string} email - string - the email of the user we want to find
   * @returns The user object
   */
  async findByEmail(email: string): Promise<User> {
    const queryFound = this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!queryFound) {
      throw new HttpException('User not found', 404);
    }
    return queryFound;
  }

  async getRestaurantsFromCity(userId: string, cityName: string) {

  }
}
