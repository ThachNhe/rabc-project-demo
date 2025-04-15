import { Injectable } from '@nestjs/common';
import { PolicyHandler } from '@/policy/policy.decorator';
import { PolicyHandlerBase } from '@/policy/policy.handler';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class DoctorPolicy1 extends PolicyHandlerBase {
  constructor() {
    super('subject.employee.id == resource.employee.id');
  }
}

@Injectable()
export class DoctorPolicy2 extends PolicyHandlerBase {
  constructor() {
    super('subject.employee.id == resource.employee.id');
  }
}
