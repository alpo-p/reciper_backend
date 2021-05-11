/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from 'mongoose';

type Context = {
  models: any
};

export type ResolverFn = (root: any, args: any, ctx: Context) => any;

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
