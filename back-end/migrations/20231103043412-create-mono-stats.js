'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MonoStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // The name of the referenced table
          key: 'id' // The name of the referenced column
        },
        allowNull: false, // Set this to false if you want the foreign key to be required
        onUpdate: 'CASCADE', // Set the onUpdate behavior as needed
        onDelete: 'CASCADE' // Set the onDelete behavior as needed
      },
      monoData: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MonoStats');
  }
};