/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid } from 'uuid';
import { Resolvers, UserAuth } from '../types';
const id: string = uuid();

let users: UserAuth[] = [
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

export const resolvers: Resolvers = {
  Query: {
    allUsers: () => users,
    findUser: (_root: any, args: { username: string }) => 
      users.find(p => p.username === args.username)
  },
  Mutation: {
    addUser: (_root: any, args: Omit<UserAuth, 'id'>): UserAuth => {
      const user: UserAuth = { ...args, id: id };
      users = users.concat(user);
      return user;
    }
  }
};
