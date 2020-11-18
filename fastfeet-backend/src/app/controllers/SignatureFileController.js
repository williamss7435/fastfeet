const SignatureFile = require('../models/SignatureFile');

class SignatureFileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await SignatureFile.create({
      name, path,
    });

    return res.json(file);
  }
}

module.exports = new SignatureFileController();
