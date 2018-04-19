const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
  return db.define('user',{
      username: {type: Sequelize.STRING, unique: true},
      password: Sequelize.STRING,
      salt: Sequelize.STRING,
      secureLevel: {type: Sequelize.INTEGER, validate: {min:0, max:3}},
      isAdmin: Sequelize.BOOLEAN
  });
};