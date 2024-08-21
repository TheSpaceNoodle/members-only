import { Router } from 'express';
import { getIndex } from '#src/controllers/indexController.js';

const router = Router();

router.route('/').get(getIndex);

export default router;
