const getQuestions = (root, args, context, info) => {
  return context.prisma.questions();
};

const getEventByCode = (parent, args, context) => {
  return context.prisma.event({ code: args.code });
};

module.exports = {
  getQuestions,
  getEventByCode
};
