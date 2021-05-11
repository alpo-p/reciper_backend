/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolvers, AuthUser, IUser, Token } from '../types';
import authService from '../utils/authService'; 

export const resolvers: Resolvers = {
  Query: {
    allUsers: (): Promise<IUser[]> => authService.allUsers(),
    findUser: (_root: any, args: any): Promise<IUser | null> => 
      authService.findUser(args),
    currentUser: (_r,_a, context) => context.currentUser,
  },
  Mutation: {
    addUser: async (_root: any, args: Omit<AuthUser, 'id'>): Promise<IUser> => 
      await authService.addUser(args),
    login: async (_root: any, args: Omit<AuthUser, 'id'>): Promise<Token> => 
      await authService.login(args),
  }
};
