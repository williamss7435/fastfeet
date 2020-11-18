const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('recipients', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueAdress',
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'uniqueAdress',
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueAdress',
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'uniqueAdress',
      },
      zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'uniqueAdress',
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
    await queryInterface.dropTable('recipients');
  },
};
