/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer, gql } from 'apollo-server';
import { v4 as uuid } from 'uuid';
import { UserAuth, Resolvers } from './src/types';


let users: UserAuth[] = [
  {
    id: '123123',
    username: 'Alpo',
    password: '12345'
  },
  {
    id: '223123',
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
    allUsers: [UserAuth]!
    findUser(username: String!): UserAuth
  }

  type Mutation {
    addUser(username: String!, password: String!): UserAuth
  }
`;

const id: string = uuid();

const resolvers: Resolvers = {
  Query: {
    allUsers: () => users,
    findUser: (_root: any, args: { username: string }) => 
      users.find(p => p.username === args.username)
  },
  Mutation: {
    addUser: (_root: any, args: Omit<UserAuth, 'id'>): UserAuth => {
      const user: UserAuth = { ...args, id: id };
      users = users.concat(user);
      return user;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});