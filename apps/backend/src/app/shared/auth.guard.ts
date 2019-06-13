import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@lovely-jwt-security/authentication';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext):  Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }
  async validateToken(auth: string): Promise<any> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN)
    }

    const token = auth.split(' ')[1];
    try {
      const secret_index = JSON.parse(Buffer.from(token.split(".")[1], 'base64').toString()).secret_num;
      if (secret_index === undefined || secret_index >= User.random_secrets.length || secret_index < 0) {
        throw new Error('Invalid secret index what u tryna do?');
      }

      const secret = User.random_secrets[secret_index];

      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN)
    }
  }
}


