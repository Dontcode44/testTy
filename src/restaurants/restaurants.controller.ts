import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { City } from 'src/cities/entities/cities.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRestaurantsFromCity(
    @Userd() userId: string,
    @Query('cityName') cityName: string,
  ): Promise<{ Restaurants: object }> {
    console.log('userId: ', userId);

    return this.restaurantsService.findRestaurantsByCity(userId, cityName);
  }
}
