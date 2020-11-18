const { DataTypes, Model } = require('sequelize');

class Recipient extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.STRING,
      },
      complement: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      zip_code: {
        type: DataTypes.STRING,
      },
    }, { sequelize });

    return this;
  }
}

module.exports = Recipient;
