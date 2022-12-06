import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transactions-register.entity';
import { Like, Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>,
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  /**
   * It finds all restaurants that are in a city with a given name
   * @param {string} cityName - string - the name of the city we want to find restaurants in
   * @returns An array of restaurants that are in the city that was passed in.
   */
  async findRestaurantsByCity(
    userId: string,
    cityName: string,
  ): Promise<{ Restaurants: object }> {

    const saveUserAndSearch = await this.transactionsRepository.create
    const queryFound = await this.restaurantsRepository
      .createQueryBuilder('restaurant')
      .select(['restaurant.name'])
      .leftJoinAndSelect('restaurant.city', 'city')
      .where('city.name = :cityName', { cityName })
      .getMany();



    let dict = { queryFound };
    return { Restaurants: dict.queryFound };
  }
}
