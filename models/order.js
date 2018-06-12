const Sequelize = require('sequelize');

/**
 *
 * @param db
 * @returns {Sequelize.Model}
 */
module.exports = function (db) {
    const Order = db.define('order', {
        total: Sequelize.INTEGER
    });
    Order.secureLevel = 3;
    return Order;
};