const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recipients',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      deliveryman_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'delivery_people',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  },
};
