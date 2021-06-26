const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'no token provided' });
  }

  const [scheme, token] = authHeader.split(" ");
  
  if(!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: 'token bad formatted' })
  }

  console.log(scheme, token);
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).send({ error: 'token invalid' });
    }
    
    console.log('decode');
    console.log(decoded);
    req.userId = decoded.id;
    return next();
  });
};