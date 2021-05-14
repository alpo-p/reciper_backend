import User from "../models/user";

export default class LikeService {
  static async like(args: { userID: string, recipeID: string}): Promise<string> {
    const { userID, recipeID } = args;

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

  static async dislike(args: { userID: string, recipeID: string}): Promise<string> {
    const { userID, recipeID } = args;

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

}