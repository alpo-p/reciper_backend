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

  type Recipe {
    id: ID!
    name: String!
    preparationTimeInMinutes: Int!
    numberOfServings: Int!
    shortDescription: String!
    longDescription: String!
    tags: [String!]!
    ingredients: [String!]!
    stepByStepDirections: [String!]!
  }

  type Query {
    allUsers: [AuthUser]!
    findUser(username: String!): AuthUser
    currentUser: AuthUser

    allRecipes: [Recipe]
    findRecipe(id: String!): Recipe
  }

  type Mutation {
    addUser(username: String!, password: String!): AuthUser
    deleteUser(id: ID!): Boolean!
    login(username: String!, password: String!): Token

    addRecipe(
      name: String!
      preparationTimeInMinutes: Int!
      numberOfServings: Int!
      shortDescription: String!
      longDescription: String!
      tags: [String!]!
      ingredients: [String!]!
      stepByStepDirections: [String!]!
    ): Recipe
    deleteRecipe(id: ID!): Boolean!
  }
`;
