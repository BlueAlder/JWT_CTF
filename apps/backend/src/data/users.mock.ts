
import { User, UserDto } from '@lovely-jwt-security/authentication';
import { generate_random_string } from '@lovely-jwt-security/utilities';

const adminCreds: UserDto = {
  username: 'admin',
  password: generate_random_string(600)
};

export const USERS: User[] = [new User(adminCreds, true)];
