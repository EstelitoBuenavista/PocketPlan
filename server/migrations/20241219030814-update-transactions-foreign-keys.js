'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transactions', 'Transactions_ibfk_1');
    await queryInterface.removeConstraint('Transactions', 'Transactions_ibfk_2'); 
    await queryInterface.addConstraint('Transactions', {
      fields: ['account_id'],
      type: 'foreign key',
      name: 'Transactions_ibfk_1',
      references: {
        table: 'Accounts',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('Transactions', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'Transactions_ibfk_2',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transactions', 'Transactions_ibfk_1');
    await queryInterface.removeConstraint('Transactions', 'Transactions_ibfk_2');
    await queryInterface.addConstraint('Transactions', {
      fields: ['account_id'],
      type: 'foreign key',
      name: 'Transactions_ibfk_1',
      references: {
        table: 'Accounts',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION' // Revert to original NO ACTION
    });
    await queryInterface.addConstraint('Transactions', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'Transactions_ibfk_2',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    });
  }
};