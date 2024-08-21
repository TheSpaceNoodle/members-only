import express from 'express';
import { getSignUp, postSignUp } from '../controllers/authControllers.js';

const router = express.Router();

router.route('/').get(getSignUp).post(postSignUp);

export default router;
