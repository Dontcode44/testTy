import { City } from 'src/cities/entities/cities.entity';
import { Transaction } from 'src/transactions/entities/transactions-register.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_user_email')
  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
