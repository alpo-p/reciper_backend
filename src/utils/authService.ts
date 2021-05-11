import { AuthUser, IUser } from '../types';

import MAuthUser from '../models/authUser';

class AuthService {
  static users: AuthUser[] = [
    {
      id: '123123',
      username: 'Alpo',
      password: '12345'
    },
    {
      id: '223123',
      username: 'baloo',
      password: '12345'
    }
  ];

  static allUsers(): AuthUser[] {
    return AuthService.users;
  }

  static findUser(args: { username: string }): AuthUser | undefined {
    return AuthService.users.find(p => p.username === args.username);
  }

  static addUser(args: Omit<AuthUser, 'id'>): Promise<IUser> {
    const user: IUser = new MAuthUser({ ...args });
    return user.save();
  }
}

export default AuthService;