import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policy.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    ) || [];

    if (policyHandlers.length === 0) {
      return true; 
    }

    const { user } = context.switchToHttp().getRequest();
    
    const request = context.switchToHttp().getRequest();
    const resourceId = request.params.id;
    const resource = request.body; 
    
    return policyHandlers.every(handler => handler.handle(user, resource));
  }
}