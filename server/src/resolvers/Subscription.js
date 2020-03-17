const newQuestionSubscribe = (parent, args, context, info) => {
  return context.prisma.$subscribe
    .question({ mutation_in: ['CREATED'] })
    .node();
};

const newQuestion = {
  subscribe: newQuestionSubscribe,
  resolve: payload => {
    return payload;
  }
};

const newVoteSubscribe = (parent, args, context, info) => {
  return context.prisma.$subscribe
    .question({ mutation_in: ['UPDATED'], updatedFields_contains: 'votes' })
    .node();
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newQuestion,
  newVote
};
