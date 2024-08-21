import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByUsername } from '../db/queries/authQueries';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);

      if (!user) {
        return done(new Error('No such user'));
      }

      const match = bcrypt.compareSync(password, user.password);

      if (!match) {
        return done(null, false, 'Wrong password');
      }

      done(null, user);
    } catch (e) {
      done(e);
    }
  }),
);

export default passport;
