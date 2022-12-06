import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/transactions/entities/transactions-register.entity';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Transaction])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
