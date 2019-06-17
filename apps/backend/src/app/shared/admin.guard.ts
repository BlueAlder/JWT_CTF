import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';


@Injectable()
export class AdminAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    const decoded = await super.validateToken(request.headers.authorization);
    if (decoded.admin === false) {
      throw new HttpException('No admin privileges', HttpStatus.FORBIDDEN)
    }


    return super.canActivate(context);
  }
}
