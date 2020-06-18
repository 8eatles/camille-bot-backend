const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../config');
const userController = require('../../controllers/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    let user = null;
    try {
      user = await userController.get({ id });
    } catch (err) {
      return done(err, false);
    }
    return done(null, user);
  }),
);

module.exports = passport.authenticate('jwt', { session: false });
