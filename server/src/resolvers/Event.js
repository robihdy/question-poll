const postedBy = (parent, args, context) => {
  return context.prisma.event({ id: parent.id }).postedBy();
};

module.exports = {
  postedBy
};
