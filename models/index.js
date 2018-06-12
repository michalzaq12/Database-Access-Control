const Sequelize = require('sequelize');
const config = require('../config/db');

const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

//----models
const User = require('./user')(db);
const Book = require('./book')(db);
const Order = require('./order')(db);



//----associations
Order.belongsTo(User, {as: 'customer'});

Book.belongsToMany(Order, {through: 'OrderBooks'});
Order.belongsToMany(Book, {through: 'OrderBooks'});


/**
 *
 * @type {{db: (*|Sequelize), User: Model, Order: (Sequelize.Model|Order), Book: (Model|Book)}}
 */
module.exports = {
    db,
    User,
    Order,
    Book
};

