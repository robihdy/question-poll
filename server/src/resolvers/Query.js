const getQuestionsByEventId = (root, args, context, info) => {
  return context.prisma
    .event({ id: args.eventId })
    .questions({ orderBy: args.orderBy });
};

const getEventByCode = (parent, args, context) => {
  return context.prisma.event({ code: args.code });
};

module.exports = {
  getQuestionsByEventId,
  getEventByCode
};
