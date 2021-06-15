import { AuthenticationError } from "apollo-server-errors";
import User from "../models/user";
import { IUser, ResolverContext } from "../types";

export default class LikeService {
  static async like(args: { recipeID: string }, context: ResolverContext): Promise<string> {
    const { recipeID } = args;

    const userID: string | null = context?.currentUser?.id;
    if (!userID) {
      throw new AuthenticationError('Not authenticated');
    }

    const findRecipeInLikedRecipes = async (): Promise<boolean> => {
      const currentUser = await User.findById(userID) as IUser;
      const likedRecipes = currentUser.likedRecipes;
      return Boolean(likedRecipes.find(r => r === recipeID));
    }; 

    const removeRecipeFromLikedRecipes = async () => {
      void await User.updateOne(
        {_id: userID},
        { $pull: { "likedRecipes": recipeID } }
      );
    };

    if(await findRecipeInLikedRecipes()) {
      void await removeRecipeFromLikedRecipes();
      return recipeID;
    }

    try {
      void await User.findOneAndUpdate(
        {_id: userID},
        { $addToSet: { likedRecipes: recipeID } },
      );
    } catch(e) {
      throw new Error(e);
    }

    return recipeID;
  }

  static async reset(context: ResolverContext): Promise<boolean> {
    const userID: string = context?.currentUser?.id;
    if (!userID) {
      throw new AuthenticationError('Not authenticated');
    }

    try {
      void await User.findByIdAndUpdate(userID, {
        $set: { likedRecipes: []}
      });
      void await User.findByIdAndUpdate(userID, {
        $set: { dislikedRecipes: []}
      });
    } catch(e) {
      throw new Error(e);
    }
    return true;
  }

}