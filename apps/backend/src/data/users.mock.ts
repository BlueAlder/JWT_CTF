// wjyaZy5yMRfuBXSX4mqQdYze

import { User, UserDto } from '@lovely-jwt-security/authentication';

const adminCreds: UserDto = {
  username: 'admin',
  password: 'wjyaZy5yMRfuBXSX4mqQdYze'
};

export const USERS: User[] = [new User(adminCreds, true)];
