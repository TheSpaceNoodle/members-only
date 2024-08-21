import express from 'express';

import 'dotenv/config';
import { indexRouter, logInRouter, signUpRouter } from './routes/index.js';
import passport from 'passport';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'some-secret', resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use('/', indexRouter);

app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
});

export default app;
