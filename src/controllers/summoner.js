const _ = require('lodash');
const Joi = require('@hapi/joi');

const { Summoner } = require('../db/models');

const get = async (payload) => {
  const schema = Joi.object({ id: Joi.number().required() });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const summoner = await Summoner.findByPk(value.id);

  if (!(summoner instanceof Summoner)) {
    throw new Error('Cannot Find Summoner');
  }

  return summoner;
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

  const { rows, count } = await Summoner.findAndCountAll(options);

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
    name: Joi.string(),
  }).validate(payload);

  if (error) {
    throw new Error(error);
  }

  const summoner = await Summoner.findOne({
    where: {
      searchName: value.name.toLowerCase().replace(' ', ''),
    },
  });

  if (!(summoner instanceof Summoner)) {
    throw new Error('Cannot Find Summoner');
  }

  return summoner;
};

const create = async (payload) => {
  const schema = Joi.object({
    userId: Joi.integer(),
    riotId: Joi.string().max(64),
    accountId: Joi.string().max(64),
    encryptedAccountId: Joi.string().max(64),
    puuid: Joi.string().max(255),
    name: Joi.string().max(32).required(),
    rankTier: Joi.string().max(16),
    rankWin: Joi.integer(),
    rankLose: Joi.integer(),
    profileIconId: Joi.integer(),
    revisionDate: Joi.date(),
    summonerLevel: Joi.integer(),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const summoner = await Summoner.create(
    _.defaults(
      {
        searchName: value.name.toLowerCase().replace(' ', ''),
      },
      value,
    ),
  );

  if (!(summoner instanceof Summoner)) {
    throw new Error('Creation Failed!');
  }

  return summoner;
};

const update = (payload) => {
  const schema = Joi.object({
    userId: Joi.integer(),
    riotId: Joi.string().max(64),
    accountId: Joi.string().max(64),
    encryptedAccountId: Joi.string().max(64),
    puuid: Joi.string().max(255),
    name: Joi.string().max(32).required(),
    rankTier: Joi.string().max(16),
    rankWin: Joi.integer(),
    rankLose: Joi.integer(),
    profileIconId: Joi.integer(),
    revisionDate: Joi.date(),
    summonerLevel: Joi.integer(),
  });

  const { error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  throw new Error('Not implement yet.');
};

const remove = async (payload) => {
  const summoner = await get(payload);
  const result = await summoner.destroy();

  return result;
};

module.exports = {
  get,
  getList,
  find,
  create,
  update,
  remove,
};
