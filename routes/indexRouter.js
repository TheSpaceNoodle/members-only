import { Router } from 'express';
import { deleteChatMessage, getIndex, postChatMessage } from '#src/controllers/indexController.js';
import { getLogOut } from '#src/controllers/authControllers.js';
import { getSecret, postSecret } from '#src/controllers/secretControllers.js';

const router = Router();

router.route('/').get(getIndex);
router.route('/log-out').get(getLogOut);
router.route('/secret').get(getSecret).post(postSecret);
router.route('/messages').post(postChatMessage);
router.route('/messages/:id/delete').post(deleteChatMessage);

export default router;
