import { PolicyHandlerBase } from '@/policy/policy.handler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class defaultPolicy extends PolicyHandlerBase {
  constructor() {
    super('');
  }
}

@Injectable()
export class TellerPolicy extends PolicyHandlerBase {
  constructor() {
    super('user.branch.id===resource.transaction.branchId');
  }
}

@Injectable()
export class TransferMoneyPolicy extends PolicyHandlerBase {
  constructor() {
    super('user.id===resource.sourceAccount.ownerId');
  }
}
