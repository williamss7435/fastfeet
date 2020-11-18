const Bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      name: 'admin',
      email: 'admin@admin',
      password_hash: Bcrypt.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async () => {
  },
};
