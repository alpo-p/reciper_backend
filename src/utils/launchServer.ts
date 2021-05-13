import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers, context } from '../graphql';

export const launchServer = () => {
  const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
  return server;
};