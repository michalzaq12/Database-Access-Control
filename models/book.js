const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Model}
 */
module.exports = function (db) {
    const Book =  db.define('book', {
        title: Sequelize.STRING,
        price: Sequelize.INTEGER
    });
    Book.secureLevel = 1;
    return Book;
};