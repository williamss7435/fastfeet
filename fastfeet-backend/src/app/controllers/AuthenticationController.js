const Jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
const Auth = require('../../config/auth');

const User = require('../models/User');

class AuthenticationController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'parametros inválidos' });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user || !Bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({
        error: 'Usuário ou senha inválida',
      });
    }

    const token = Jwt.sign(
      {
        id: user.id,
        name: user.name,
        email,
      }, Auth.privateKey, { expiresIn: Auth.expiresIn },
    );

    return res.json({
      name: user.name,
      email,
      token,
    });
  }
}

module.exports = new AuthenticationController();
