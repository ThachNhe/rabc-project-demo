import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { BankOfficer } from '../bank-officer/entities/bank-officer.entity';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(BankOfficer)
    private bankOfficerRepository: Repository<BankOfficer>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Branch[]> {
    return this.branchRepository.find();
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException(`Không tìm thấy chi nhánh với ID ${id}`);
    }

    return branch;
  }

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const newBranch = this.branchRepository.create(createBranchDto);
    return this.branchRepository.save(newBranch);
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOne(id);

    // Cập nhật thông tin
    Object.assign(branch, updateBranchDto);

    return this.branchRepository.save(branch);
  }

  async remove(id: string): Promise<{ message: string }> {
    const branch = await this.findOne(id);
    await this.branchRepository.remove(branch);

    return { message: `Chi nhánh với ID ${id} đã được xóa thành công` };
  }

  async getBranchOfficers(branchId: string): Promise<BankOfficer[]> {
    // Kiểm tra chi nhánh tồn tại
    await this.findOne(branchId);

    return this.bankOfficerRepository.find({
      where: { branchId },
    });
  }

  async getBranchPerformance(
    branchId: string,
    month: string,
    year: string,
  ): Promise<any> {
    // Kiểm tra chi nhánh tồn tại
    const branch = await this.findOne(branchId);

    // Lấy danh sách tài khoản thuộc chi nhánh
    const accounts = await this.getAccountsByBranchId(branchId);
    const accountIds = accounts.map((account) => account.id);

    // Lấy giao dịch theo tháng, năm
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Ngày cuối cùng của tháng

    const transactions = await this.transactionRepository.find({
      where: [
        {
          fromAccountId: { $in: accountIds },
          transactionDate: {
            $gte: startDate,
            $lt: endDate,
          },
        },
        {
          toAccountId: { $in: accountIds },
          transactionDate: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      ],
    });

    // Tính toán chỉ số hiệu suất
    const totalTransactions = transactions.length;
    const totalDeposit = this.calculateTotalByType(transactions, 'DEPOSIT');
    const totalWithdraw = this.calculateTotalByType(transactions, 'WITHDRAW');
    const totalTransfer = this.calculateTotalByType(transactions, 'TRANSFER');
    const netCashFlow = totalDeposit - totalWithdraw;

    return {
      branch: branch.name,
      month: parseInt(month),
      year: parseInt(year),
      totalAccounts: accounts.length,
      totalTransactions,
      totalDeposit,
      totalWithdraw,
      totalTransfer,
      netCashFlow,
    };
  }

  private async getAccountsByBranchId(branchId: string): Promise<any[]> {
    return []; // Thay thế bằng truy vấn thực tế
  }

  private calculateTotalByType(
    transactions: Transaction[],
    type: string,
  ): number {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }
}
