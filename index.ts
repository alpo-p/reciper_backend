import { ApolloServer } from 'apollo-server';
import { launchApolloServer } from './src/utils/launchApolloServer';
import { connectToMongoDB } from './src/utils/connectToMongoDB';

void connectToMongoDB();

const server: ApolloServer = launchApolloServer();

void server.listen({
  port: 4242
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});