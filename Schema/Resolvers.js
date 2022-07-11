const { prisma } = require("../src/context");

const resolvers = {
  Query: {
    topic: (data) => {
      console.log({ data });

      return prisma.topic.findUnique({
        where: { id: 1 },
      });
    },
  },
};

module.exports = resolvers;
