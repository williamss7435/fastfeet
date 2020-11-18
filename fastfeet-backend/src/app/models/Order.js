const { DataTypes, Model } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init({
      product: {
        type: DataTypes.STRING,
      },
      canceled_at: {
        type: DataTypes.DATE,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.DeliveryPeople, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });

    this.belongsTo(models.SignatureFile, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

module.exports = Order;
