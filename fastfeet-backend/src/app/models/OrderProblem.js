const { DataTypes, Model } = require('sequelize');

class OrderProblem extends Model {
  static init(sequelize) {
    super.init({
      description: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }
}

module.exports = OrderProblem;
