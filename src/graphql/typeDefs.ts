import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    notes: [Note!]!
    categories: [Category!]!
  }

  type Note {
    id: Int!
    title: String!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    category: Category
    owner: User!
  }

  type Category {
    id: Int!
    name: String!
    color: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    owner: User!
    notes: [Note!]!
  }

  enum NotePrivacy {
    PRIVATE
    SHARED
  }

  type Query {
    getUser(id: Int!): User
    getNote(id: Int!): Note
    getCategory(id: Int!): Category
    getUserByUsername(username: String!): User
    getUserByEmail(email: String!): User
    getAllNotes: [Note!]!
    getAllCategories: [Category!]!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    loginUser(data: LoginUserInput!): AuthPayload!
    createNote(data: CreateNoteInput!): Note!
    createCategory(data: CreateCategoryInput!): Category!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    updateNote(id: Int!, data: UpdateNoteInput!): Note!
    updateCategory(id: Int!, data: UpdateCategoryInput!): Category!
    deleteUser(id: Int!): User!
    deleteNote(id: Int!): Note!
    deleteCategory(id: Int!): Category!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input CreateNoteInput {
    title: String!
    content: String!
    ownerId: Int!
    categoryId: Int
  }

  input CreateCategoryInput {
    name: String!
    color: String!
    ownerId: Int!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  input UpdateNoteInput {
    title: String
    content: String
    categoryId: Int
  }

  input UpdateCategoryInput {
    name: String
    color: String
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type DateTime {
    value: String
  }
`;
