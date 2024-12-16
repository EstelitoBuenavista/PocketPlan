'use strict';
const bcryptjs = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await bcryptjs.hash("12345", 8)
    await queryInterface.bulkInsert('users', [
      { id: 255, username: 'john_doe', email: 'john@example.com', password: password, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
