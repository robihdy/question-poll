const { GraphQLServer } = require('graphql-yoga');

let questions = [
  {
    id: 'q-0',
    description: 'What is GraphQL?',
    votes: 0
  },
  {
    id: 'q-1',
    description: 'What are the differences between GraphQL and REST?',
    votes: 0
  }
];

let idCount = questions.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Question Poll app`,
    questions: () => questions,
    question: (parent, args) =>
      questions.find(question => question.id === args.id)
  },
  Mutation: {
    ask: (parent, args) => {
      const question = {
        id: `q-${idCount++}`,
        description: args.description,
        votes: 0
      };
      questions.push(question);
      return question;
    },
    updateQuestion: (parent, args) => {
      const idx = questions.findIndex(question => question.id === args.id);
      if (idx === -1) {
        return;
      }
      questions[idx].description = args.description;
      return questions[idx];
    },
    deleteQuestion: (parent, args) => {
      const idx = questions.findIndex(question => question.id === args.id);
      console.log(idx);
      if (idx === -1) {
        return;
      }
      return questions.splice(idx, idx + 1)[0];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
