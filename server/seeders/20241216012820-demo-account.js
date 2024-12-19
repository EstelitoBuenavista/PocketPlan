'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('accounts', [
     { user_id: 255,id :254, name: 'Savings Account',balance:10000, createdAt: new Date(), updatedAt: new Date() },
     { user_id: 255,id :255, name: 'Checking Account',balance:8150, expense:9850, createdAt: new Date(), updatedAt: new Date() },
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
