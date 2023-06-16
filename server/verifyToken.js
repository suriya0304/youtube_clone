import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  console.log('req cookie is', req.cookies.access_token);
  const token = req.cookies.access_token;
  console.log('token is ', token);
  if (!token) return res.send('not authenticated');
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).send('token not valid', err);
    console.log('user is', user);
    console.log(req.user);
    req.user = user;
    console.log(req.user);
    next();
  });
};
