import { OPEN_ROUTES } from '#src/constants/index.js';

const isAuthenticated = (req, res, next) => {
  const isRouteOpen = OPEN_ROUTES.includes(req.url);

  if (req.user && req.url !== '/' && isRouteOpen) {
    console.log(req.user);
    return res.redirect('/');
  }

  if (!req.user && !isRouteOpen) {
    return res.redirect('/');
  }

  return next();
};

export { isAuthenticated };
