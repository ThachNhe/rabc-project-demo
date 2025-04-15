import { PolicyHandlerBase } from '@/policy/policy.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class GetPolicy extends PolicyHandlerBase {
  constructor() {
    super('subject.employee.id == resource.employee.id');
  }
}

@Injectable()
export class CreatePolicy extends PolicyHandlerBase {
  constructor() {
    super('user.id == resource.userId');
  }
}
