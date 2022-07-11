const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Topic {
    id: ID!
    name: String!
  }

  type Query {
    topic(id: ID!): Topic
  }
`;

module.exports = typeDefs;
