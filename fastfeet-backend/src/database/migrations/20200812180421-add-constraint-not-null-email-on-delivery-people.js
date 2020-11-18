const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn('delivery_people', 'email',
      {
        type: DataTypes.STRING,
        allowNull: false,
      });
  },

  down: async () => {

  },
};
