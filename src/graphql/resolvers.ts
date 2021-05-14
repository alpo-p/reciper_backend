import { Resolvers, IUser, Token, IRecipe } from '../types';
import AuthService from '../utils/authService'; 
import RecipeService from '../utils/recipeService';
import LikeService from '../utils/likeService';

export const resolvers: Resolvers = {
  Query: {
    allUsers: (): Promise<IUser[]> => AuthService.allUsers(),
    findUser: async (_root: unknown, args: {username: string}): Promise<IUser | null> => 
      await AuthService.findUser(args),
    currentUser: (_r,_a, context) => context.currentUser,

    allRecipes: (): Promise<IRecipe[]> => RecipeService.allRecipes(),
    findRecipe: async (_root: unknown, args: {id: string}): Promise<IRecipe | null> => 
      await RecipeService.findRecipeById(args),
  },
  Mutation: {
    addUser: async (_root: unknown, args: Omit<IUser, 'id'>): Promise<IUser> => 
      await AuthService.addUser(args),
    deleteUser: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await AuthService.deleteUser(args),
    login: async (_root: unknown, args: Omit<IUser, 'id'>): Promise<Token> => 
      await AuthService.login(args),
    
    addRecipe: async (_root: unknown, args: Omit<IRecipe, 'id'>): Promise<IRecipe> => 
      await RecipeService.addRecipe(args),
    deleteRecipe: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await RecipeService.deleteRecipe(args),

    likeRecipe: async (_root: unknown, args: { recipeID: string }, context): Promise<string> =>
      await LikeService.like(args, context.currentUser.id),
    dislikeRecipe: async (_root: unknown, args: { recipeID: string }, context):  Promise<string> =>
      await LikeService.dislike(args, context.currentUser.id),
  }
};
