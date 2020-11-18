const { DataTypes, Model } = require('sequelize');

class SignatureFile extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
      },
      path: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.BASE_URL}/files/${this.path}`;
        },
      },
    }, {
      sequelize,
    });

    return this;
  }
}

module.exports = SignatureFile;
