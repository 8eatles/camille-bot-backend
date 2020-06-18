const { Router } = require('express');
const { get, create, update } = require('../../controllers/site');
const { version } = require('../../../package.json');

const authenticate = require('../middlewares/authenticate');

const route = Router();

module.exports = (app) => {
  app.use('/site', route);

  route.get('/version', async (req, res) => {
    return res.json({ version }).status(200);
  });

  route.get('/', async (req, res, next) => {
    let result;

    try {
      result = await get();
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.post('/', async (req, res, next) => {
    let result;

    try {
      result = await create(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(201);
  });

  route.put('/', authenticate, async (req, res, next) => {
    let result;

    try {
      result = await update(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(201);
  });
};
