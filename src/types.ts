import { Document } from 'mongoose';

export type ResolverContext = {
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
}

export type ILoginUser = Pick<IUser, 'username' | 'password'>;

export interface IRecipe extends Document {
  id: string,
  name: string,
  pictureUrl: string,
  preparationTimeInMinutes: number,
  numberOfServings: number,
  longDescription: string,
  tags: string[],
  ingredients: string[],
  stepByStepDirections: string[]
}

////

export type Token = { token: string };
