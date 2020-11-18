const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('orders', 'signature_id',
      {
        type: DataTypes.INTEGER,
        references: { model: 'signature_files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('orders', 'signature_id');
  },
};
