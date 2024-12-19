'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    const [results] = await queryInterface.sequelize.query(
      "SHOW COLUMNS FROM accounts LIKE 'expense';"
    );

    if (results.length === 0) {
      
      await queryInterface.addColumn('accounts', 'expense', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      });
    } else {
      console.log("Column 'expense' already exists in 'accounts' table. Skipping addition.");
    }
  },

  async down(queryInterface, Sequelize) {
   
    const [results] = await queryInterface.sequelize.query(
      "SHOW COLUMNS FROM accounts LIKE 'expense';"
    );

    if (results.length > 0) {
      
      await queryInterface.removeColumn('accounts', 'expense');
    } else {
      console.log("Column 'expense' does not exist in 'accounts' table. Skipping removal.");
    }
  },
};
