import { City } from "src/cities/entities/cities.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  savedUserId: string;

  @OneToMany(() => User, (user) => user.transactions)
  user: User;

  @Column()
  savedCityId: string;

  @OneToMany(() => City, (city) => city.transactions)
  city: City;
}