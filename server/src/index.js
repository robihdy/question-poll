const { GraphQLServer } = require('graphql-yoga');

let questions = [
  {
    id: 'q-0',
    description: 'What is GraphQL?',
    votes: 0
  },
  {
    id: 'q-2',
    description: 'What are the differences between GraphQL and REST?',
    votes: 0
  }
];

const typeDefs = `
type Query {
  info: String!
  questions: [Question!]!
}

type Question {
  id: ID!
  description: String!,
  votes: Int!
}
`;

const resolvers = {
  Query: {
    info: () => `This is the API of a Question Poll app`,
    questions: () => questions
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
