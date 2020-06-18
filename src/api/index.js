const { Router } = require('express');
const site = require('./routes/site');
const auth = require('./routes/auth');
const user = require('./routes/user');
const group = require('./routes/group');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  site(app);
  auth(app);
  user(app);
  group(app);

  return app;
};
