const validator = require('validator').default;
const Bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;
    let isInvalid = null;

    // Validation
    if (!name || !validator.isLength(name, { min: '3' })) {
      isInvalid = 'nome inválido (Minímo 3 letras)';
    } else if (!email || !validator.isEmail(email)) {
      isInvalid = 'email inválido';
    } else if (!password || !validator.isLength(String(password), { min: '6' })) {
      isInvalid = 'a senha deve contem pelo menos 6 letras ou números';
    }
    if (isInvalid) { return res.status(400).json({ error: isInvalid }); }

    const user = await User.findOne({
      where: { email },
    });
    if (user) { return res.status(400).json({ error: 'usuário já existe' }); }

    await User.create({
      name,
      email,
      password_hash: Bcrypt.hashSync(String(password), 8),
    });

    return res.json({
      name,
      email,
    });
  }
}

module.exports = new UserController();
