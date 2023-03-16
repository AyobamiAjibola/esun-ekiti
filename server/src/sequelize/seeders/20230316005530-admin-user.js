'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      id: '9b2d2b1e-7b10-4c06-8ec4-6b4a4f4d6d3e',
      fullName: 'super admin',
      phone_num: '08031957692',
      isAdmin: true,
      user_type: 'admin',
      password: 'Password12@',
      confirm_password: 'Password12@',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
