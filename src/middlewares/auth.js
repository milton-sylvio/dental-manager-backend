import jwt from 'jsonwebtoken'
import config from 'config'

export default (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    // return res.status(401).send({ message: 'Token não informado!' });
    return next();
  }
  
  jwt.verify(token, config.get('auth.key'), (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Token inválido.' }); 
    }

    req.decoded = decoded;
    next();
  });
};