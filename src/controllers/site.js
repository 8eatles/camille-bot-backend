const _ = require('lodash');
const Joi = require('@hapi/joi');
const randomstring = require('randomstring');

const { Site } = require('../db/models');

const get = async (options) => {
  const site = await Site.findByPk(
    1,
    options
      ? options
      : {
          attributes: { exclude: ['salt'] },
        },
  );

  if (!(site instanceof Site)) {
    throw new Error('Cannot Find Site');
  }

  return site;
};

const create = async (payload) => {
  if ((await Site.findByPk(1)) instanceof Site) {
    throw new Error('Site already exists');
  }

  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const site = await Site.create(
    _.defaults(
      {
        salt: randomstring.generate(32),
        verify: false,
      },
      value,
    ),
  );

  if (!(site instanceof Site)) {
    throw new Error('Creation Failed!');
  }

  return site;
};

const update = async (payload) => {
  if (!((await Site.findByPk(1)) instanceof Site)) {
    throw new Error('Site does not exist');
  }

  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const result = await Site.update(value, { where: { id: 1 } });

  return {
    message: `${result[0]} row(s) updated`,
  };
};

module.exports = {
  get,
  create,
  update,
};
