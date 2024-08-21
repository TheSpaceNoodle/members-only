import express from 'express';
import { getSignUp, postSignUp } from '#src/controllers/authControllers.js';

const router = express.Router();

router.route('/').get(getSignUp).post(postSignUp);

export default router;
