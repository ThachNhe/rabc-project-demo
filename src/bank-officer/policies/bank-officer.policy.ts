import { PolicyHandlerBase } from '@/policy/policy.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class BankOfficerPolicy1 extends PolicyHandlerBase {
  constructor() {
    super('user.branchId == resource.branchId');
  }
}

@Injectable()
export class BankOfficerPolicy2 extends PolicyHandlerBase {
  constructor() {
    super('user.branchId == resource.branchId');
  }
}
