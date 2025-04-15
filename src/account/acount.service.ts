import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async get(id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException(`Không tìm thấy tài khoản với ID ${id}`);
    }

    return account;
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const newAccount = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(newAccount);
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.get(id);

    // Cập nhật thông tin
    Object.assign(account, updateAccountDto);

    return this.accountRepository.save(account);
  }

  async remove(id: string): Promise<{ message: string }> {
    const account = await this.get(id);
    await this.accountRepository.remove(account);

    return { message: `Tài khoản với ID ${id} đã được xóa thành công` };
  }
}
