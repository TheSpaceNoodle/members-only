import { Router } from 'express';
import { getLogIn, postLogIn } from '#src/controllers/authControllers.js';

const router = Router();

router.route('/').get(getLogIn).post(postLogIn);

export default router;
