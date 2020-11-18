const Photofile = require('../models/PhotoFile');

class PhotoFileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const photo = await Photofile.create({
      name, path,
    });

    return res.json(photo);
  }
}

module.exports = new PhotoFileController();
