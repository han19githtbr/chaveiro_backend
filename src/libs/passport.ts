import passport from 'passport';
// eslint-disable-next-line linebreak-style

import { Strategy } from 'passport-jwt';
import { options } from '@config/passport';

passport.use(
  new Strategy(options, (payload, done) => done(null, payload)),
);

export default passport;
