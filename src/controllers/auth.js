const _ = require('lodash');
const Joi = require('@hapi/joi');

const { User, Group } = require('../db/models');
const userController = require('./user');

const { validatePassword } = require('../utils/password');
const { issueToken, validateToken, renewToken } = require('../utils/authToken');

const login = async (payload) => {
  const schema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const user = await User.findOne({
    where: {
      username: value.username,
    },
  });

  if (!(user instanceof User)) {
    throw new Error('Cannot Find User');
  }

  if (!validatePassword(user, value.password)) {
    throw new Error('Username or password is incorrect');
  }

  const result = await issueToken(user);

  user.accessToken = result.accessToken;
  user.refreshToken = result.refreshToken;
  user.lastLoggedAt = new Date();

  await user.save();

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      ...result,
    },
  };
};

const register = async (payload) => {
  const created = await userController.create(payload);

  return created;
};

const check = async (payload) => {
  return await validateToken(payload);
};

const renew = async (payload) => {
  return await renewToken(payload);
};

module.exports = {
  login,
  register,
  check,
  renew,
};
