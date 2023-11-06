'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MonoStats', [{
      userID: 58,
      monoData: JSON.stringify({
          health: 50,
          hunger: 50,
          cleanliness: 50,
          happiness: 50
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
