'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        account_id: 255,
        category_id: 255,
        amount: 1000,
        type: 'expense',
        transaction_date: "2024-12-06T00:00:00.000Z",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        account_id: 255,
        category_id: 254,
        amount: 5000,
        type: 'income',
        transaction_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        account_id: 255,
        category_id: 255,
        amount: 3000,
        type: 'expense',
        transaction_date: "2024-12-08T00:00:00.000Z",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        account_id: 255,
        category_id: 254,
        amount: 3000,
        type: 'income',
        transaction_date: "2024-12-10T00:00:00.000Z",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
