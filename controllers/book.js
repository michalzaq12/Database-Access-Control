const {Book} = require('../models');
const {canRead, canWrite, MESSAGE} = require('./authorization');




module.exports = {
    /**
     *
     * @param title
     * @param price
     * @param user
     * @return {Promise<Book | string>}
     */
    create({title, price}, user) {
        if(!canWrite(user, Book)) return Promise.reject(MESSAGE);
        return Book.create({
            title,
            price
        })
    },
    /**
     *
     * @param user
     * @return {Promise<Book[] | string>}
     */
    get(user) {
        if(!canRead(user, Book)) return Promise.reject(MESSAGE);
        console.log(`Getting all books from db`);
        return Book.findAll({
            attributes: ['id', 'title', 'price']
        })
    }
};