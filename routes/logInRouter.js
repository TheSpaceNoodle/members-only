import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get((_, res) => {
    res.render('log-in');
  })
  .post((req, res) => {});

export default router;
