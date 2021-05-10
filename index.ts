/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer, gql } from 'apollo-server';
import { Resolvers } from './src/types';

type UserAuth = {
  username: string,
  password: string
};


const users: UserAuth[] = [
  {
    username: 'Alpo',
    password: '12345'
  },
  {
    username: 'baloo',
    password: '12345'
  }
];

const typeDefs = gql`
  type UserAuth {
    username: String!
    password: String!
  }

  type Query {
    findUser(username: String!): UserAuth
  }
`;

const resolvers: Resolvers = {
  Query: {
    findUser: (_root: any, args: any) => 
      users.find(p => p.username === args.username)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});