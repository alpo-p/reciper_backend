import { ApolloServer } from 'apollo-server';
import { launchServer } from './src/utils/launchServer';
import { connectdb } from './src/utils/connectdb';

void connectdb();

const server: ApolloServer = launchServer();

void server.listen({
  port: 4001
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});