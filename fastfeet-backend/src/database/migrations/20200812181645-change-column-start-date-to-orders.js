const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn('orders', 'start_date',
      {
        type: DataTypes.DATE,
        allowNull: true,
      });
  },

  down: async () => {

  },
};
