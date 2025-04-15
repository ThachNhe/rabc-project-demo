import { PolicyHandlerBase } from '@/policy/policy.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class CreateTransactionPolicy extends PolicyHandlerBase {
  constructor() {
    super('user.id == resource.fromAccount.userId');
  }
}

@Injectable()
export class GetTransactionPolicy extends PolicyHandlerBase {
  constructor() {
    super('subject.employee.id == resource.employee.id');
  }
}
