const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getOrganizerId } = require('../utils');

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const organizer = await context.prisma.createOrganizer({ ...args, password });
  const token = jwt.sign({ organizerId: organizer.id }, APP_SECRET);

  return {
    token,
    organizer
  };
};

const login = async (parent, args, context, info) => {
  const organizer = await context.prisma.organizer({ email: args.email });
  if (!organizer) {
    throw new Error('No such organizer found');
  }

  const valid = await bcrypt.compare(args.password, organizer.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ organizerId: organizer.id }, APP_SECRET);

  return {
    token,
    organizer
  };
};

const post = async (parent, args, context, info) => {
  const organizerId = getOrganizerId(context);
  const count = await context.prisma
    .eventsConnection()
    .aggregate()
    .count();

  const event = await context.prisma.createEvent({
    name: args.name,
    code: `QP-${count}`,
    postedBy: { connect: { id: organizerId } }
  });
  return event;
};

const ask = (parent, args, context) => {
  return context.prisma.createQuestion({
    username: args.username,
    description: args.description,
    votes: 0,
    onEvent: { connect: { id: args.eventId } }
  });
};

const vote = async (parent, args, context) => {
  const { votes } = await context.prisma.question({ id: args.questionId });
  return context.prisma.updateQuestion({
    data: {
      votes: votes + 1
    },
    where: {
      id: args.questionId
    }
  });
};

module.exports = {
  signup,
  login,
  post,
  ask,
  vote
};
