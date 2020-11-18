const { DataTypes, Model } = require('sequelize');

class DeliveryPeople extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.PhotoFile, { foreignKey: 'photo_id', as: 'photo' });
    this.hasMany(models.Order, { foreignKey: 'deliveryman_id', as: 'orders' });
  }
}

module.exports = DeliveryPeople;
