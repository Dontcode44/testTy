import { City } from 'src/cities/entities/cities.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/* The Restaurant class has a name and a city. The city is a foreign key to the City class */
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, (city) => city.restaurants)
  city: string;
}
