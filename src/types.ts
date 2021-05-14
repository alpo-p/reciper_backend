import { Document } from 'mongoose';

type ResolverContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  models: any,
  currentUser: IUser
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolverFn = (root: any, args: any, context: ResolverContext) => any;

type ResolverMap = {
  [field: string]: ResolverFn;
};

export type Resolvers = {
  Query: ResolverMap;
  Mutation: ResolverMap;
};

////

export interface IUser extends Document {
  id: string,
  username: string,
  password: string
  likedRecipes: string[],
  dislikedRecipes: string[]
}

export interface IRecipe extends Document {
  id: string,
  name: string,
  pictureUrl: string,
  preparationTimeInMinutes: number,
  numberOfServings: number,
  shortDescription: string,
  longDescription: string,
  tags: string[],
  ingredients: string[],
  stepByStepDirections: string[]
}

////

export type Token = { value: string };
