const _ = require('lodash');
const Joi = require('@hapi/joi');

const { Participant } = require('../db/models');

const get = async (payload) => {
  const schema = Joi.object({ id: Joi.number().required() });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const participant = await Participant.findByPk(value.id);

  if (!(participant instanceof Participant)) {
    throw new Error('Cannot Find Participant');
  }

  return participant;
};

const getList = async (payload) => {
  const schema = Joi.object({
    offset: Joi.integer(),
    limit: Joi.integer().max(1000),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const options = _.defaults(payload, {
    offset: value.offset || 0,
    limit: value.limit || 10,
    order: ['id'],
    attributes: { exclude: ['hash', 'salt', 'accessToken', 'refreshToken'] },
  });

  const { rows, count } = await Participant.findAndCountAll(options);

  if (count === 0 || rows.length === 0) {
    throw new Error('no data');
  }

  return {
    rows,
    count,
  };
};

const create = async (payload) => {
  const schema = Joi.object({
    accountId: Joi.string().max(64).required(),
    name: Joi.string().max(32).required(),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const participant = await Participant.create(
    _.defaults(
      {
        searchName: value.name.toLowerCase().replace(' ', ''),
      },
      value,
    ),
  );

  if (!(participant instanceof Participant)) {
    throw new Error('Creation Failed!');
  }

  return participant;
};

const update = (payload) => {
  const schema = Joi.object({
    accountId: Joi.string().max(64),
    name: Joi.string().max(32),
  });

  const { error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  throw new Error('Not implement yet.');
};

const remove = async (payload) => {
  const participant = await get(payload);
  const result = await participant.destroy();

  return result;
};

module.exports = {
  get,
  getList,
  create,
  update,
  remove,
};
