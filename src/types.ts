/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type UserAuth = {
  id: string,
  username: string,
  password: string
};
