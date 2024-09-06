import { ExtractJwt, StrategyOptions } from 'passport-jwt';
// eslint-disable-next-line linebreak-style

export const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};
