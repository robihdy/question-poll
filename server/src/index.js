const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is the API of a Question Poll app`,
    questions: (root, args, context, info) => {
      return context.prisma.questions();
    }
  },
  Mutation: {
    ask: (root, args, context) => {
      return context.prisma.createQuestion({
        description: args.description,
        votes: 0
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
