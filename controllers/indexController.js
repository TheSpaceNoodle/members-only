export const getIndex = (req, res) => {
  //   console.log(req.user);
  res.render('index', { user: req.user, chatMessages: [] });
};
