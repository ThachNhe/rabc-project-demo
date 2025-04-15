import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Account } from '../account/entities/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransferDto } from './dto/transfer.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  
  async transfer(transferDto: TransferDto): Promise<Transaction> {
    const { fromAccountId, toAccountId, amount, description } = transferDto;

    // Kiểm tra tài khoản nguồn
    const fromAccount = await this.accountRepository.findOne({
      where: { id: fromAccountId },
    });
    
    if (!fromAccount) {
      throw new NotFoundException(`Không tìm thấy tài khoản nguồn với ID ${fromAccountId}`);
    }

    // Kiểm tra tài khoản đích
    const toAccount = await this.accountRepository.findOne({
      where: { id: toAccountId },
    });
    
    if (!toAccount) {
      throw new NotFoundException(`Không tìm thấy tài khoản đích với ID ${toAccountId}`);
    }

    // Kiểm tra số dư
    if (fromAccount.balance < amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện giao dịch');
    }

    // Thực hiện chuyển tiền
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    // Lưu thay đổi vào tài khoản
    await this.accountRepository.save(fromAccount);
    await this.accountRepository.save(toAccount);

    // Tạo bản ghi giao dịch
    const transaction = this.transactionRepository.create({
      fromAccountId,
      toAccountId,
      amount,
      description,
      type: 'TRANSFER',
      status: 'COMPLETED',
      transactionDate: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }


  async deposit(depositDto: DepositDto): Promise<Transaction> {
    const { accountId, amount, description } = depositDto;

    // Kiểm tra tài khoản
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    
    if (!account) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID ${accountId}`);
    }

    // Thực hiện nạp tiền
    account.balance += amount;
    await this.accountRepository.save(account);

    // Tạo bản ghi giao dịch
    const transaction = this.transactionRepository.create({
      toAccountId: accountId,
      amount,
      description,
      type: 'DEPOSIT',
      status: 'COMPLETED',
      transactionDate: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }


  async withdraw(withdrawDto: WithdrawDto): Promise<Transaction> {
    const { accountId, amount, description } = withdrawDto;

    // Kiểm tra tài khoản
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    
    if (!account) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID ${accountId}`);
    }

    // Kiểm tra số dư
    if (account.balance < amount) {
      throw new BadRequestException('Số dư không đủ để thực hiện giao dịch');
    }

    // Thực hiện rút tiền
    account.balance -= amount;
    await this.accountRepository.save(account);

    // Tạo bản ghi giao dịch
    const transaction = this.transactionRepository.create({
      fromAccountId: accountId,
      amount,
      description,
      type: 'WITHDRAW',
      status: 'COMPLETED',
      transactionDate: new Date(),
    });

    return this.transactionRepository.save(transaction);
  }


  async getHistory(accountId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: [
        { fromAccountId: accountId },
        { toAccountId: accountId },
      ],
      order: {
        transactionDate: 'DESC',
      },
    });
  }


  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Không tìm thấy giao dịch với ID ${id}`);
    }

    return transaction;
  }
}