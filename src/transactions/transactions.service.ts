import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions-register.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  /**
   * It returns a promise that resolves to an array of transactions
   * @returns An array of transactions
   */
  async getAllTransactions(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }
}
