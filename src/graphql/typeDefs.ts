import { gql } from 'apollo-server';

export const typeDefs = gql`
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
