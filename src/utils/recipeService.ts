import { UserInputError } from 'apollo-server';
import Recipe from '../models/recipe';
import { IRecipe } from '../types';

class RecipeService {
  static async allRecipes(): Promise<IRecipe[]> {
    return await Recipe.find({});
  }

  static async findRecipeById(args: { id: string }): Promise<IRecipe | null> {
    return await Recipe.findById(args.id);
  }

  static async addRecipe(args: Omit<IRecipe, 'id'>): Promise<IRecipe> {
    const { 
      name,
      pictureUrl,
      preparationTimeInMinutes,
      numberOfServings,
      shortDescription,
      longDescription,
      tags,
      ingredients,
      stepByStepDirections
    } = args;

    const recipe: IRecipe = new Recipe({
      name,
      pictureUrl,
      preparationTimeInMinutes,
      numberOfServings,
      shortDescription,
      longDescription,
      tags,
      ingredients,
      stepByStepDirections
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