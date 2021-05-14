import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    likedRecipes: [String]!
    dislikedRecipes: [String]!
  }

  type Token {
    value: String!
  }

  type Recipe {
    id: ID!
    name: String!
    pictureUrl: String!
    preparationTimeInMinutes: Int!
    numberOfServings: Int!
    shortDescription: String!
    longDescription: String!
    tags: [String!]!
    ingredients: [String!]!
    stepByStepDirections: [String!]!
  }

  type Query {
    allUsers: [User]!
    findUser(username: String!): User
    currentUser: User

    allRecipes: [Recipe]
    findRecipe(id: String!): Recipe
  }

  type Mutation {
    addUser(username: String!, password: String!): User
    deleteUser(id: ID!): Boolean!
    login(username: String!, password: String!): Token

    likeRecipe(recipeID: ID!): String
    dislikeRecipe(recipeID: ID!): String
    resetLikesAndDislikes: Boolean

    addRecipe(
      name: String!
      pictureUrl: String!
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