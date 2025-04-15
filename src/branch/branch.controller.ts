import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  create(@Body() body) {
    return this.branchService.create(body);
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() body) {
    return this.branchService.update(id, body);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.branchService.remove(id);
  }

  @Get(':id/officers')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getBranchOfficers(@Param('id') id: string) {
    return this.branchService.getBranchOfficers(id);
  }
}
