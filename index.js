import express from 'express';

import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import passport from 'passport';
import '#src/auth/passport.js';
import pool from '#src/db/pool.js';
import { indexRouter, logInRouter, signUpRouter } from '#src/routes/index.js';

import 'dotenv/config';

const app = express();
const pgSession = connectPgSimple(session);

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool,
      tableName: process.env.SESSION_TABLE, //you have to create session table first. Use query linked on the connect-pg-simple library's github
    }),
  }),
);

app.use(passport.session());

app.use('/', indexRouter);

app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});

export default app;
