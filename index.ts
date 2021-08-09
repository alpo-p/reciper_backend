import { ApolloServer } from 'apollo-server';
import { launchApolloServer } from './src/utils/launchApolloServer';
import { connectToMongoDB } from './src/utils/connectToMongoDB';

void connectToMongoDB();

const server: ApolloServer = launchApolloServer();

let port: number | string | undefined = process.env.PORT;
if (port == null || port == "") {
  port = 4242;
}

void server.listen({
  port
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});