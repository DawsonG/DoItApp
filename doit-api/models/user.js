const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config/config.json');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, isEmail: true, },
    hash: DataTypes.STRING(1024),
    salt: DataTypes.STRING,
  });

  User.hook('beforeCreate', (user) => {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(user.hash, user.salt, 10000, 512, 'sha512').toString('hex');
  });

  User.hook('beforeUpdate', (user) => {
    if (user.hash) {
      user.salt = crypto.randomBytes(16).toString('hex');
      user.hash = crypto.pbkdf2Sync(user.hash, user.salt, 10000, 512, 'sha512').toString('hex');
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.Todo);
  };

  User.prototype.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  };

  User.prototype.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.id,
      email: this.email,
      exp: parseInt(exp.getTime() / 1000, 10),
    }, config.secret);
  };

  return User;
};
