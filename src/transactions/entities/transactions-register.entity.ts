import { City } from "src/cities/entities/cities.entity";
import { User } from "src/users/entities/users.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.transactions)
  user: User;

  @OneToMany(() => City, (city) => city.transactions)
  city: City;
}