import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';
import { Reflector } from '@nestjs/core';
import { AUDIT_KEY } from './decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private audit: AuditService,
    private reflector: Reflector,
    ) {}

intercept(context: ExecutionContext, next: CallHandler) {
  const request = context.switchToHttp().getRequest();

  const action = this.reflector.get<string>(
    AUDIT_KEY,
    context.getHandler(),
  );

  if (!action) {
    return next.handle(); 
  }

    const user = request.user;

    return next.handle().pipe(
      tap(async () => {
        try {
          await this.audit.log({
            user_id: user?.sub,
            company_id: user?.company_id,
            action: `${request.method} ${request.url}`,
            metadata: {
              body: request.body,
              email: user?.email,
              params: request.params,
            },
            ip_address: request.ip,
          });
        } catch (e) {
          console.error('AUDIT ERROR', e);
        }
      }),
    );
  }
}