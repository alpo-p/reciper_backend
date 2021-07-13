import { AuthenticationError, UserInputError } from 'apollo-server';
import Recipe from '../models/recipe';
import { IRecipe, IUser, ResolverContext } from '../types';

class RecipeService {
  static async allRecipes(): Promise<IRecipe[]> {
    return await Recipe.find({});
  }

  static async findRecipeById(args: { id: string }): Promise<IRecipe | null> {
    return await Recipe.findById(args.id);
  }

  static async findLikedRecipesByCurrentUser({ currentUser }: { currentUser: IUser }): Promise<IRecipe[] | null> {
    const recipeIDs = currentUser.likedRecipes;
    return await Recipe.find({ '_id': { $in: recipeIDs } });
  }

  static async findRecipesAddedByCurrentUser(context: ResolverContext): Promise<IRecipe[] | null> {
    const addedByUserId : string | null = context?.currentUser?.id;
    if (!addedByUserId) {
      throw new AuthenticationError('Not authenticated');
    }

    return await Recipe.find({ addedByUserId });
  } 

  static isRecipeLikedByCurrentUser(args: { id: string }, context: { currentUser: IUser }): boolean {
    const recipeIDsLikedByCurrentUser = context.currentUser.likedRecipes;
    return Boolean(recipeIDsLikedByCurrentUser.find(id => id === args.id));
  }

  static async addRecipe(args: Omit<IRecipe, 'id' | 'addedByUserId'>, context: ResolverContext): Promise<IRecipe> {
    const { 
      name,
      pictureUrl,
      preparationTimeInMinutes,
      numberOfServings,
      longDescription,
      tags,
      ingredients,
      stepByStepDirections,
    } = args;

    
    const addedByUserId : string | null = context?.currentUser?.id;
    if (!addedByUserId) {
      throw new AuthenticationError('Not authenticated');
    }

    const recipe: IRecipe = new Recipe({
      name,
      pictureUrl,
      preparationTimeInMinutes,
      numberOfServings,
      longDescription,
      tags,
      ingredients,
      stepByStepDirections,
      addedByUserId
    });

    try {
      await recipe.save();
    } catch (e) {
      throw new UserInputError(e.message, {
        invalidArgs: args
      });
    }
    return recipe;
  }

  static async deleteRecipe(args: { id: string }): Promise<boolean> {
    const recipe = await Recipe.findByIdAndRemove(args.id);
    if (recipe === null) return false;
    return true;
  }

}

export default RecipeService;