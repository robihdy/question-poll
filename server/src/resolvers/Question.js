const onEvent = (parent, args, context) => {
  return context.prisma.question({ id: parent.id }).onEvent();
};

module.exports = {
  onEvent
};
