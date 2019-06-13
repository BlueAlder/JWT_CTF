import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { IsNotEmpty } from 'class-validator';
import {generate_random_string_array} from './utilities';

export class User {
    static readonly  random_secrets = generate_random_string_array(1000, 50);

    username: string;
    admin: boolean;
    hash: string;

     constructor(data: UserDto, isAdmin: boolean) {
      this.username = data.username;
      bcrypt.hash(data.password, 10, (err, hash) => {
        this.hash = hash;
      });
      this.admin = isAdmin;
    }

    comparePassword(attempt: string) {
      return bcrypt.compare(attempt, this.hash);
    }

    private get token() {
       const secret_num = Math.floor(Math.random() * (User.random_secrets.length -1));
      const {username, admin} = this;
      return jwt.sign({
        username, admin, secret_num
      }, User.random_secrets[secret_num])
    }


    toResponseObject() {
      const {username, admin, token} = this;
      return {username, admin, token};
    }
}


export class UserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  username: string;
  admin: boolean;
  token: string;
}

