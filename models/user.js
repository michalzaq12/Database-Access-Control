const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    return db.define('user', {
        username: {type: Sequelize.STRING, unique: true},
        password: Sequelize.STRING,
        salt: Sequelize.STRING,
        secureLevel: {type: Sequelize.INTEGER, validate: {min: 1, max: 3}, defaultValue: 2},
        isAdmin: {type: Sequelize.BOOLEAN, defaultValue: false}
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
};