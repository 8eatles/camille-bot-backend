const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const config = require('../config');
const { Site } = require('../db/models');

let globalSalt = null;

const encryptPassword = async (password, salt) => {
  if (!globalSalt) {
    const site = await Site.findByPk(1);
    globalSalt = site.salt;
  }

  const userSalt = salt || randomstring.generate(32);
  const hash = bcrypt.hashSync(
    `${globalSalt}${password}${userSalt}`,
    config.bcrypt.nRounds,
  );

  return { salt: userSalt, hash };
};

const validatePassword = async ({ hash, salt }, password) => {
  if (!globalSalt) {
    const site = await Site.findByPk(1);
    globalSalt = site.salt;
  }

  return bcrypt.compareSync(`${globalSalt}${password}${salt}`, hash);
};

module.exports = {
  encryptPassword,
  validatePassword,
};
