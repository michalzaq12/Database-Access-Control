const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Sequelize.Model}
 */
module.exports = function (db) {
    return db.define('message',{
        text: Sequelize.STRING,
    });
};