import { Resolvers, AuthUser, IUser, Token, IRecipe } from '../types';
import authService from '../utils/authService'; 
import recipeService from '../utils/recipeService';

export const resolvers: Resolvers = {
  Query: {
    allUsers: (): Promise<IUser[]> => authService.allUsers(),
    findUser: async (_root: unknown, args: {username: string}): Promise<IUser | null> => 
      await authService.findUser(args),
    currentUser: (_r,_a, context) => context.currentUser,

    allRecipes: (): Promise<IRecipe[]> => recipeService.allRecipes(),
    findRecipe: async (_root: unknown, args: {id: string}): Promise<IRecipe | null> => 
      await recipeService.findRecipeById(args),
  },
  Mutation: {
    addUser: async (_root: unknown, args: Omit<AuthUser, 'id'>): Promise<IUser> => 
      await authService.addUser(args),
    deleteUser: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await authService.deleteUser(args),
    login: async (_root: unknown, args: Omit<AuthUser, 'id'>): Promise<Token> => 
      await authService.login(args),
    
    addRecipe: async (_root: unknown, args: Omit<IRecipe, 'id'>): Promise<IRecipe> => 
      await recipeService.addRecipe(args),
    deleteRecipe: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await recipeService.deleteRecipe(args),
  }
};
