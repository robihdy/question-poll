const questions = (root, args, context, info) => {
  return context.prisma.questions();
};

module.exports = {
  questions
};
