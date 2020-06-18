const _ = require('lodash');
const Joi = require('@hapi/joi');

const { User, Group } = require('../db/models');

const { encryptPassword } = require('../utils/password');

const get = async (payload) => {
  const schema = Joi.object({ id: Joi.number().required() });
  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  const user = await User.findByPk(value.id, {
    attributes: { exclude: ['hash', 'salt', 'accessToken', 'refreshToken'] },
    include: [
      {
        model: Group,
        as: 'groups',
        // attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
      },
    ],
  });

  if (!(user instanceof User)) {
    throw new Error('Cannot Find User');
  }

  return user;
};

const getList = async (payload) => {
  const options = _.defaults(payload, {
    offset: 0,
    limit: 10,
    order: ['id'],
    attributes: { exclude: ['hash', 'salt', 'accessToken', 'refreshToken'] },
  });

  const { rows, count } = await User.findAndCountAll(options);

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
    account: Joi.string(),
    email: Joi.string(),
  })
    .xor('account', 'email')
    .validate(payload);

  if (error) {
    throw new Error(error);
  }

  const user = await User.findOne({ where: value });

  if (!(user instanceof User)) {
    throw new Error('Cannot Find User');
  }

  return user;
};

const exists = async (payload) => {
  const schema = Joi.object({
    account: Joi.string(),
    email: Joi.string(),
  }).xor('account', 'email');

  const validated = schema.validate(payload);

  if (validated.error) {
    throw new Error(validated.error);
  }

  const { account, email } = validated;

  if (account) {
    return (await User.findOne({ where: { account } })) instanceof User;
  }

  if (email) {
    return (await User.findOne({ where: { email } })) instanceof User;
  }

  return false;
};

const create = async (payload) => {
  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$'))
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    givenName: Joi.string().min(1).max(30).required(),
    familyName: Joi.string().min(1).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'kr'] } })
      .required(),
    phone: Joi.string().required(),
  });

  const { value, error } = schema.validate(payload);

  if (error) {
    throw new Error(error);
  }

  // Create Password Hash & Salt
  const { hash, salt } = await encryptPassword(value.password);

  const user = await User.create(
    _.defaults(
      {
        hash,
        salt,
        verify: false,
      },
      value,
    ),
  );

  if (!(user instanceof User)) {
    throw new Error('Creation Failed!');
  }

  return user;
};

const update = () => {
  throw new Error('Not implement yet.');
};

const remove = async (payload) => {
  const user = await get(payload);
  const result = await user.destroy();

  return result;
};

module.exports = {
  get,
  getList,
  find,
  exists,
  create,
  update,
  remove,
};
