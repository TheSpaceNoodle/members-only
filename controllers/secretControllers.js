import { handleSecret } from '#src/utils/index.js';

export const getSecret = (_, res) => {
  res.render('secret');
};

export const postSecret = async (req, res) => {
  await handleSecret(req.body.secret, req.user.id, req);
  res.redirect('/');
};
