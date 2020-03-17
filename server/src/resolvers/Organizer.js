const events = (parent, args, context) => {
  return context.prisma.organizer({ id: parent.id }).events();
};

module.exports = {
  events
};
