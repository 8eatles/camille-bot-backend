const { Router } = require('express');
const {
  get,
  getList,
  create,
  update,
  remove,
} = require('../../controllers/participant');

const authenticate = require('../middlewares/authenticate');

const route = Router();

module.exports = (app) => {
  app.use('/participants', authenticate, route);

  route.get('/:id', async (req, res, next) => {
    let result;

    try {
      result = await get(req.params);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.get('/', async (req, res, next) => {
    let result;

    try {
      result = await getList(req.params);
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

  route.put('/', async (req, res, next) => {
    let result;

    try {
      result = await update(req.body);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.delete('/:id', async (req, res, next) => {
    let result;

    try {
      result = await remove(req.params);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });
};
