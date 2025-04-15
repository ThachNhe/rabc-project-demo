import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankOfficer } from './entities/bank-officer.entity';
import { CreateBankOfficerDto } from './dto/create-bank-officer.dto';
import { UpdateBankOfficerDto } from './dto/update-bank-officer.dto';

@Injectable()
export class BankOfficerService {
  constructor(
    @InjectRepository(BankOfficer)
    private bankOfficerRepository: Repository<BankOfficer>,
  ) {}

  async update(
    id: string,
    updateBankOfficerDto: UpdateBankOfficerDto,
  ): Promise<BankOfficer> {
    const bankOfficer = await this.findOne(id);

    if (!bankOfficer) {
      throw new NotFoundException(
        `Không tìm thấy nhân viên ngân hàng với ID ${id}`,
      );
    }

    // Cập nhật thông tin
    Object.assign(bankOfficer, updateBankOfficerDto);

    return this.bankOfficerRepository.save(bankOfficer);
  }

  async create(
    id: string,
    createBankOfficerDto: CreateBankOfficerDto,
  ): Promise<BankOfficer> {
    const newBankOfficer = this.bankOfficerRepository.create({
      ...createBankOfficerDto,
      branchId: id, // Giả sử id là branchId
    });

    return this.bankOfficerRepository.save(newBankOfficer);
  }

  async findOne(id: string): Promise<BankOfficer | null> {
    return this.bankOfficerRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<BankOfficer[]> {
    return this.bankOfficerRepository.find();
  }

  async remove(id: string): Promise<{ message: string }> {
    const bankOfficer = await this.findOne(id);

    if (!bankOfficer) {
      throw new NotFoundException(
        `Không tìm thấy nhân viên ngân hàng với ID ${id}`,
      );
    }

    await this.bankOfficerRepository.remove(bankOfficer);

    return {
      message: `Nhân viên ngân hàng với ID ${id} đã được xóa thành công`,
    };
  }
}
