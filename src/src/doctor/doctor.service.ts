import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  /**
   * Cập nhật thông tin bác sĩ
   * @param id ID của bác sĩ
   * @param updateDoctorDto Dữ liệu cập nhật
   * @returns Bác sĩ đã được cập nhật
   */
  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);

    if (!doctor) {
      throw new NotFoundException(`Không tìm thấy bác sĩ với ID ${id}`);
    }

    // Cập nhật thông tin
    Object.assign(doctor, updateDoctorDto);

    return this.doctorRepository.save(doctor);
  }

  /**
   * Tạo bác sĩ mới
   * @param id ID của phòng khám/bệnh viện (nếu có)
   * @param createDoctorDto Dữ liệu bác sĩ cần tạo
   * @returns Bác sĩ đã được tạo
   */
  async create(id: string, createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    // Nếu id là ID của phòng khám/bệnh viện, bạn có thể thêm logic để liên kết bác sĩ với phòng khám

    const newDoctor = this.doctorRepository.create({
      ...createDoctorDto,
      hospitalId: id, // Giả sử id là hospitalId
    });

    return this.doctorRepository.save(newDoctor);
  }

  /**
   * Tìm bác sĩ theo ID
   * @param id ID của bác sĩ
   * @returns Thông tin bác sĩ hoặc null nếu không tìm thấy
   */
  async findOne(id: string): Promise<Doctor | null> {
    return this.doctorRepository.findOne({
      where: { id },
    });
  }

  /**
   * Lấy danh sách tất cả bác sĩ
   * @returns Danh sách bác sĩ
   */
  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  /**
   * Xóa bác sĩ
   * @param id ID của bác sĩ
   * @returns Thông báo xóa thành công
   */
  async remove(id: string): Promise<{ message: string }> {
    const doctor = await this.findOne(id);

    if (!doctor) {
      throw new NotFoundException(`Không tìm thấy bác sĩ với ID ${id}`);
    }

    await this.doctorRepository.remove(doctor);

    return { message: `Bác sĩ với ID ${id} đã được xóa thành công` };
  }
}
