const Sequelize = require('sequelize');
const config = require('../config/db');

const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

//----models
const User = require('./user')(db);
const Message = require('./message')(db);



//----associations
//This will add the attribute userId to Message.
// Instances of User will get the accessors getMessages and setMessages (addMessage? // addMessages?)
User.hasMany(Message, {as: 'Messages'});



module.exports = {
    db,
    User,
    Message
};

