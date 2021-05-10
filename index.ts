import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './src/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});