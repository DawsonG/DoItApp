const crypto = require('crypto');



module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync('wolf008duh', salt, 10000, 512, 'sha512').toString('hex');
    const hash1= crypto.pbkdf2Sync('password1', salt, 10000, 512, 'sha512').toString('hex');

    return queryInterface.bulkInsert('Users', [
      {
        username: 'Dawson',
        email: 'dawsong@osmstudios.com',
        salt,
        hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Lauren',
        email: 'lauren.leuschner@gmail.com',
        salt,
        hash: hash1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
