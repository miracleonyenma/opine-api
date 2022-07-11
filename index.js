const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const http = require("http");

const typeDefs = require("./Schema/TypeDefs");
const resolvers = require("./Schema/Resolvers");

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageGraphQLPlayground()],
    playground: {
      settings: {
        "editor.theme": "light",
      },
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer(typeDefs, resolvers);
