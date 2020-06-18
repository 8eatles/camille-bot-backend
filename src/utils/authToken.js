const jwt = require('jsonwebtoken');
const { Site } = require('../db/models');
const userController = require('../controllers/user');

const config = require('../config');

const issueToken = async ({ id, username, email }) => {
  const accessToken = await jwt.sign(
    { id, username, email },
    config.jwt.secret,
    {
      expiresIn: config.jwt.accessTokenExpiresIn,
    },
  );

  const refreshToken = await jwt.sign(
    { id },
    `${config.jwt.secret}${accessToken}`,
    {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    },
  );

  // refresh token & access token return
  return {
    accessToken,
    refreshToken,
  };
};

const validateToken = async ({ accessToken }) => {
  return jwt.verify(accessToken, config.jwt.secret);
};

const renewToken = async ({ accessToken, refreshToken }) => {
  const { id, iat, exp } = jwt.verify(refreshToken, accessToken);

  // user exists?
  const { username, email } = userController.get({ id });

  const newAccessToken = await jwt.sign(
    { id, username, email },
    config.jwt.secret,
    {
      expiresIn: config.jwt.accessTokenExpiresIn,
    },
  );

  const newRefreshToken = await jwt.sign(
    { id, iat, exp },
    `${config.jwt.secret}${newAccessToken}`,
  );

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

module.exports = {
  issueToken,
  validateToken,
  renewToken,
};
