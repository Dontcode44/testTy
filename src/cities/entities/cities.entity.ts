import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Transaction } from 'src/transactions/entities/transactions-register.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /* Creating a relationship between the City and Restaurant entities. */
  @OneToMany(() => Restaurant, (restaurant) => restaurant.city)
  restaurants: Restaurant[];

  @ManyToOne(() => Transaction, (transaction) => transaction.city)
  transactions: Transaction[];
}
