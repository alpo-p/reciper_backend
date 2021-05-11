/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolvers, AuthUser, IUser } from '../types';
import authService from '../utils/authService'; 


export const resolvers: Resolvers = {
  Query: {
    allUsers: () => authService.allUsers(),
    findUser: (_root: any, args: { username: string }): AuthUser | undefined => 
      authService.findUser(args)
  },
  Mutation: {
    addUser: (_root: any, args: Omit<AuthUser, 'id'>): Promise<IUser> => 
      authService.addUser(args)
  }
};
