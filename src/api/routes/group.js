const { Router } = require('express');
const {
  get,
  getList,
  find,
  exists,
  create,
  update,
  remove,
  addUser,
  removeUser,
} = require('../../controllers/group');

const authenticate = require('../middlewares/authenticate');

const route = Router();

module.exports = (app) => {
  app.use('/groups', authenticate, route);

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

  route.get('/name/:name', async (req, res, next) => {
    let result;

    try {
      result = await find(req.params);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.post('/:groupId/users/:userId', async (req, res, next) => {
    let result;

    try {
      result = await addUser(req.params);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });

  route.delete('/:groupId/users/:userId', async (req, res, next) => {
    let result;

    try {
      result = await removeUser(req.params);
    } catch (err) {
      return next(err);
    }

    return res.json(result).status(200);
  });
};
