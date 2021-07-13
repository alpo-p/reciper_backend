import { Resolvers, IUser, Token, IRecipe, ILoginUser } from '../types';
import AuthService from '../utils/authService'; 
import RecipeService from '../utils/recipeService';
import LikeService from '../utils/likeService';

export const resolvers: Resolvers = {
  Query: {
    allUsers: (): Promise<IUser[]> => AuthService.allUsers(),
    findUser: async (_root: unknown, args: {username: string}): Promise<IUser | null> => 
      await AuthService.findUser(args),
    currentUser: (_r,_a, context) => context.currentUser,
    likedRecipesByCurrentUser: (_r_, _a, context): Promise<IRecipe[] | null> => 
      RecipeService.findLikedRecipesByCurrentUser(context),

    isRecipeLikedByCurrentUser: (_r, args: { id: string }, context): boolean =>
      RecipeService.isRecipeLikedByCurrentUser(args, context),

    allRecipes: (): Promise<IRecipe[]> => RecipeService.allRecipes(),
    findRecipe: async (_root: unknown, args: {id: string}): Promise<IRecipe | null> => 
      await RecipeService.findRecipeById(args),
    recipesAddedByCurrentUser: (_r, _a, context): Promise<IRecipe[] | null> =>
      RecipeService.findRecipesAddedByCurrentUser(context),
  },
  Mutation: {
    addUser: async (_root: unknown, args: ILoginUser): Promise<IUser> => 
      await AuthService.addUser(args),
    deleteUser: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await AuthService.deleteUser(args),
    login: async (_root: unknown, args: ILoginUser): Promise<Token> => 
      await AuthService.login(args),
    
    addRecipe: async (_root: unknown, args: Omit<IRecipe, 'id' | 'addedByUserId'>, context): Promise<IRecipe> => 
      await RecipeService.addRecipe(args, context),
    deleteRecipe: async(_root: unknown, args: { id: string }): Promise<boolean> =>
      await RecipeService.deleteRecipe(args),

    likeRecipe: async (_root: unknown, args: { recipeID: string }, context): Promise<string> =>
      await LikeService.like(args, context),
    resetLikesAndDislikes: async (_root: unknown, _args: unknown, context): Promise<boolean> =>
      await LikeService.reset(context)
  }
};
