/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';

type ResolverContext = {
  models: any,
  currentUser: AuthUser
};

export type ResolverFn = (root: any, args: any, context: ResolverContext) => any;

type ResolverMap = {
  [field: string]: ResolverFn;
};

export type Resolvers = {
  Query: ResolverMap;
  Mutation: ResolverMap;
};

export type AuthUser = {
  id: string,
  username: string,
  password: string
};

export interface IUser extends Document {
  username: string,
  password: string
}

export interface IRecipe extends Document {
  id: string,
  name: string,
  preparationTimeInMinutes: number,
  numberOfServings: number,
  shortDescription: string,
  longDescription: string,
  tags: string[],
  ingredients: string[],
  stepByStepDirections: string[]
}

export type Token = { value: string };

//export type Context = { currentUser: string };