import { gql } from 'apollo-server';

export const typeDefs = gql`
  type AuthUser {
    username: String!
    password: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allUsers: [AuthUser]!
    findUser(username: String!): AuthUser
    currentUser: AuthUser
  }

  type Mutation {
    addUser(username: String!, password: String!): AuthUser
    deleteUser(id: ID!): Boolean
    login(username: String!, password: String!): Token
  }
`;
