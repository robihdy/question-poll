const jwt = require('jsonwebtoken');
const APP_SECRET = 'gql-qpoll';

const getOrganizerId = context => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { organizerId } = jwt.verify(token, APP_SECRET);
    return organizerId;
  }

  throw new Error('Not authenticated');
};

module.exports = {
  APP_SECRET,
  getOrganizerId
};
