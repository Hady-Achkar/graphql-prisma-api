import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import prisma from "./libs/prisma";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers, context: { prisma } });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
