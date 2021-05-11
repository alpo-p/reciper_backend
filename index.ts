import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers, context } from './src/graphql';

import { dbconfig } from './src/utils/dbconfig';

import dotenv from 'dotenv';
dotenv.config();

void dbconfig();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});