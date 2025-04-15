import { PolicyHandlerBase } from '@/policy/policy.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class TransactionPolicy1 extends PolicyHandlerBase {
  constructor() {
    super('user.id == resource.fromAccount.userId');
  }
}

@Injectable()
export class TransactionPolicy2 extends PolicyHandlerBase {
  constructor() {
    super('user.branchId == resource.account.branchId');
  }
}

@Injectable()
export class TransactionPolicy3 extends PolicyHandlerBase {
  constructor() {
    super('user.id == resource.account.userId');
  }
}

@Injectable()
export class TransactionPolicy4 extends PolicyHandlerBase {
  constructor() {
    super('user.branchId == resource.fromAccount.branchId');
  }
}
