import { AuthenticationError } from "apollo-server-errors";
import User from "../models/user";
import { ResolverContext } from "../types";

export default class LikeService {
  static async like(args: { recipeID: string }, context: ResolverContext): Promise<string> {
    const { recipeID } = args;

    const userID: string = context?.currentUser?.id;
    if (!userID) {
      throw new AuthenticationError('Not authenticated');
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

  static async dislike(args: { recipeID: string }, context: ResolverContext): Promise<string> {
    const { recipeID } = args;

    const userID: string = context?.currentUser?.id;
    if (!userID) {
      throw new AuthenticationError('Not authenticated');
    }

    try {
      void await User.findOneAndUpdate(
        {_id: userID},
        { $addToSet: { dislikedRecipes: recipeID } },
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