import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { USERS } from '../../data/users.mock'
import { User, UserRO, UserDto } from '@lovely-jwt-security/authentication';

@Injectable()
export class UserService {
  users: User[] = USERS;


  showAll(): User[] {
    const users =  this.users;
    return users;
  }

  async login(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    const user = this.users.find(userRow => userRow.username === username);

    if (user && await user.comparePassword(password)) {
      return user.toResponseObject();

    } else {
      throw new HttpException(
        'Invalid Username or Password',
        HttpStatus.BAD_REQUEST
      )
    }

  }

  register(data: UserDto): UserRO {
    const {username} = data;
    let user = this.users.find(userRow => userRow.username === username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    user = new User(data, false);
    this.users.push(user);
    return user.toResponseObject();
  }

}
