'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove the old constraint if it exists
    await queryInterface.removeConstraint('transactions', 'transactions_ibfk_1', { ifExists: true });

    // Add the new constraint with CASCADE options
    await queryInterface.addConstraint('transactions', {
      fields: ['account_id'],
      type: 'foreign key',
      name: 'transactions_ibfk_1', 
      references: {
        table: 'accounts',
        field: 'id',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the new constraint
    await queryInterface.removeConstraint('transactions', 'transactions_ibfk_1');

    // Optionally, add back the old constraint if needed
    await queryInterface.addConstraint('transactions', {
      fields: ['account_id'],
      type: 'foreign key',
      name: 'transactions_ibfk_1',
      references: {
        table: 'accounts',
        field: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    });
  }
};