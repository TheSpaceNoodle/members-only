import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserById, findUserByUsername } from '#src/db/queries/authQueries.js';
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const selectedUser = await findUserById(id);
    done(null, selectedUser);
  } catch (err) {
    done(err);
  }
});
