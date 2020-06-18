const _ = require('lodash');
const Joi = require('@hapi/joi');

const { Group } = require('../db/models');

const userController = require('./user');

const get = async (payload) => {
  const schema = Joi.object({ id: Joi.number().required() });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const group = await Group.findByPk(value.id);

  if (!(group instanceof Group)) {
    throw new Error('Cannot Find Group');
  }

  return group;
};

const getList = async (payload) => {
  const options = _.defaults(payload, {
    offset: 0,
    limit: 10,
    order: ['id'],
    attributes: { exclude: ['hash'] },
  });

  const { rows, count } = await Group.findAndCountAll(options);

  if (count === 0 || rows.length === 0) {
    throw new Error('no data');
  }

  return {
    rows,
    count,
  };
};

const find = async (payload) => {
  const { value, error } = Joi.object({
    name: Joi.string().required(),
  }).validate(payload);

  if (error) {
    throw new Error(error);
  }

  const group = await Group.findOne({ where: value });

  if (!(group instanceof Group)) {
    throw new Error('Cannot Find Group');
  }

  return group;
};

const exists = async (payload) => {
  throw new Error('Not implement yet.');
};

const create = async (payload) => {
  throw new Error('Not implement yet.');
};

const update = () => {
  throw new Error('Not implement yet.');
};

const remove = () => {
  throw new Error('Not implement yet.');
};

const addUser = async (payload) => {
  const { value, error } = Joi.object({
    groupId: Joi.number().required(),
    userId: Joi.number().required(),
  }).validate(payload);

  console.log(value);

  if (error) {
    throw new Error(error);
  }

  const group = await get({ id: value.groupId });
  const user = await userController.get({ id: value.userId });

  return await group.addUser(user);
};

const removeUser = async (payload) => {
  const { value, error } = Joi.object({
    groupId: Joi.number().required(),
    userId: Joi.number().required(),
  }).validate(payload);

  if (error) {
    throw new Error(error);
  }

  const group = await get({ id: value.groupId });
  const user = await userController.get({ id: value.userId });

  return await group.removeUser(user);
};

module.exports = {
  get,
  getList,
  find,
  exists,
  create,
  update,
  remove,
  addUser,
  removeUser,
};
