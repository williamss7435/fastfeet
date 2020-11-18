const Jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Auth = require('../../config/auth');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: 'Token não informado',
    });
  }

  try {
    const [, token] = req.headers.authorization.split(' ');
    const tokenDecode = await promisify(Jwt.verify)(token, Auth.privateKey);
    req.idUser = tokenDecode.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido',
    });
  }
};
