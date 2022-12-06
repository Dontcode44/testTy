import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { City } from './entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  async getRestaurantsCity(userd: string, cityName: string) {
    const queryFound = this.citiesRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.restaurants', 'restaurant')
      .where('city.name = :cityName', { cityName })
      .andWhere('city.user = :userId)', { userId: userd })
      .getOne();

      console.log(queryFound);
      

    if (!queryFound) {
      throw new HttpException('User not found', 404);
    }
    return queryFound;
  }
}
