const { Router } = require('express');
const { login, register, check, renew } = require('../../controllers/auth');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/login', async (req, res, next) => {
    let result;

    try {
      result = await login(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.post('/register', async (req, res, next) => {
    let result;

    try {
      result = await register(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.post('/check', async (req, res, next) => {
    let result;

    try {
      result = await check(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.post('/renew', async (req, res, next) => {
    let result;

    try {
      result = await renew(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });
};
