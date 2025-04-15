import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  /**
   * Lấy thông tin bệnh nhân theo ID
   * @param id ID của bệnh nhân
   * @returns Thông tin bệnh nhân
   */
  async get(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Không tìm thấy bệnh nhân với ID ${id}`);
    }

    return patient;
  }

  /**
   * Lấy danh sách tất cả bệnh nhân
   * @returns Danh sách bệnh nhân
   */
  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  /**
   * Tạo bệnh nhân mới
   * @param createPatientDto Dữ liệu bệnh nhân cần tạo
   * @returns Bệnh nhân đã được tạo
   */
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(newPatient);
  }

  /**
   * Cập nhật thông tin bệnh nhân
   * @param id ID của bệnh nhân
   * @param updatePatientDto Dữ liệu cập nhật
   * @returns Bệnh nhân đã được cập nhật
   */
  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.get(id);

    // Cập nhật thông tin
    Object.assign(patient, updatePatientDto);

    return this.patientRepository.save(patient);
  }

  /**
   * Xóa bệnh nhân
   * @param id ID của bệnh nhân
   * @returns Thông báo xóa thành công
   */
  async remove(id: string): Promise<{ message: string }> {
    const patient = await this.get(id);
    await this.patientRepository.remove(patient);

    return { message: `Bệnh nhân với ID ${id} đã được xóa thành công` };
  }
}
