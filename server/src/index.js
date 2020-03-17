const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Organizer = require('./resolvers/Organizer');
const Event = require('./resolvers/Event');
const Question = require('./resolvers/Question');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Organizer,
  Event,
  Question,
  Subscription
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
