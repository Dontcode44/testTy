import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTransactions() {
    return await this.transactionsService.getAllTransactions();
  }
}
