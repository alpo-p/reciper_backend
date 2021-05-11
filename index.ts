import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './src/graphql';

import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log('connecting to mongodb');

const mongoConfig = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
mongoose.connect(MONGODB_URI, mongoConfig)
  .then(() => {
    console.log('Monnected to MongoDB');
  })
  .catch((e) => {
    console.log('Error connecting to MongoDB', e?.message);
  });


const server = new ApolloServer({
  typeDefs,
  resolvers
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});