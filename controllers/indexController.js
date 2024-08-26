import { createMessage, deleteMessage, getAllMessages } from '#src/db/queries/chatQueries.js';
import asyncHandler from 'express-async-handler';

import 'dotenv/config';

export const getIndex = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();

  res.render('index', { user: req.user, messages: messages.rows });
});

export const postChatMessage = asyncHandler(async (req, res) => {
  await createMessage({ body: req.body, userID: req.user.id });

  res.redirect('/');
});

export const deleteChatMessage = asyncHandler(async (req, res) => {
  await deleteMessage(req.params.id);
  res.redirect('/');
});
