import asyncHandler from 'express-async-handler';
import { body } from 'express-validator';
import { createUser, findUserByEmail, findUserByUsername } from '#src/db/queries/authQueries.js';
import { handleSecret } from '#src/utils/index.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

export const getSignUp = (_, res) => {
  res.render('sign-up');
};

export const postSignUp = [
  body('first_name', "First name can't be empty").trim().escape().notEmpty().escape(),
  body('last_name', "Last name can't be empty").trim().escape().notEmpty().escape(),
  body('email', 'Invalid email')
    .isEmail()
    .notEmpty()
    .custom(async (email) => {
      const user = await findUserByEmail(email);

      if (user) {
        throw new Error('This email is already in-use');
      }
    }),
  body('username', 'Invalid username')
    .notEmpty()
    .custom(async (username) => {
      if (username.contains(' ')) {
        throw new Error("Username can't contain whitespace");
      }

      const user = await findUserByUsername(username);

      if (user) {
        throw new Error('This username is already in use');
      }
    })
    .escape(),
  body('password').notEmpty(),
  body('password_repeat', 'Passwords should match').custom(
    (password_repeat, { req }) => password_repeat === req.body.password,
  ),
  asyncHandler(async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
    const user = await createUser({ ...req.body, password: hashedPassword });

    if (req.body.secret) {
      handleSecret(req.body.secret, user.id);
    }

    res.redirect('/log-in');
  }),
];

export const getLogIn = (_, res) => {
  res.render('log-in');
};

export const postLogIn = [
  passport.authenticate('local', { failureRedirect: '/log-in' }),
  (_, res) => {
    res.redirect('/');
  },
];

export const getLogOut = (req, res, next) => {
  if (req.user) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
  }

  res.redirect('/');
};
