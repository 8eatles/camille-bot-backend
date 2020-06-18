const _ = require('lodash');
const Joi = require('@hapi/joi');

const { Match } = require('../db/models');
const participantController = require('./participant');

const get = async (payload) => {
  const schema = Joi.object({ id: Joi.number().required() });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const match = await Match.findByPk(value.id);

  if (!(match instanceof Match)) {
    throw new Error('Cannot Find Match');
  }

  return match;
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

  const { rows, count } = await Match.findAndCountAll(options);

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

  const match = await Match.create(
    _.defaults(
      {
        searchName: value.name.toLowerCase().replace(' ', ''),
      },
      value,
    ),
  );

  if (!(match instanceof Match)) {
    throw new Error('Creation Failed!');
  }

  return match;
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
  const match = await get(payload);
  const result = await match.destroy();

  return result;
};

const addParticipant = async (payload) => {
  const { value, error } = Joi.object({
    matchId: Joi.number().required(),
    participantId: Joi.number().required(),
  }).validate(payload);

  console.log(value);

  if (error) {
    throw new Error(error);
  }

  const match = await get({ id: value.matchId });
  const participant = await participantController.get({
    id: value.participantId,
  });

  return await match.addUser(participant);
};

const removeParticipant = async (payload) => {
  const { value, error } = Joi.object({
    id: Joi.number().required(),
    participantId: Joi.number().required(),
  }).validate(payload);

  if (error) {
    throw new Error(error);
  }

  const match = await get({ id: value.matchId });
  const participant = await participantController.get({
    id: value.participantId,
  });

  return await match.removeUser(participant);
};

module.exports = {
  get,
  getList,
  create,
  update,
  remove,
  addParticipant,
  removeParticipant,
};
