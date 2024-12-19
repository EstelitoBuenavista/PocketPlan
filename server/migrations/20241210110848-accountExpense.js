'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Accounts');
    if (!tableInfo.expense) { 
      await queryInterface.addColumn('Accounts', 'expense', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0, 
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Accounts', 'expense');
  }
};