const Multer = require('multer');
const { extname, resolve } = require('path');
const Crypto = require('crypto');

module.exports = {
  storage: Multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename(req, file, cb) {
      Crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
