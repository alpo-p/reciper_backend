import { gql } from 'apollo-server';

export const typeDefs = gql`
  type AuthUser {
    username: String!
    password: String!
  }

  type Query {
    allUsers: [AuthUser]!
    findUser(username: String!): AuthUser
  }

  type Mutation {
    addUser(username: String!, password: String!): AuthUser
  }
`;
