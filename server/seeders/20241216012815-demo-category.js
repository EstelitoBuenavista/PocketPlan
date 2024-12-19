'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { user_id: 255,id:253, name: 'Work', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 255,id:254, name: 'Food', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 255,id:255, name: 'Bills', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 255,id:256, name: 'Uncategorized', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
