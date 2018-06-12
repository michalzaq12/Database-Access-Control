const {Order, Book, db} = require('../models');
const {canWrite, canRead, MESSAGE} = require('./authorization');

module.exports = {
    /**
     *
     * @param books
     * @param user
     * @return {Promise<Order | string>}
     */
    create({books}, user) {
        if(!canWrite(user, Order)) return Promise.reject(MESSAGE);
        return db.transaction(t => {
            return Order.create({total: 50, customerId: user.id}, {transaction: t})
                .then(order => order.setBooks(books, {transaction: t}))
        });
    },
    /**
     *
     * @param user
     * @return {Promise<Order[] | string>}
     */
    getAll(user) {
        if(!canRead(user, Order)) return Promise.reject(MESSAGE);
        console.log(`Getting all orders`);
        return Order.findAll({
            attributes: ['id', 'total', 'createdAt'],
            order: [['createdAt', 'DESC']],
            include: [{
                model: Book,
                attributes: ['title', 'price'],
                through: {
                    attributes: []
                }
            }]
        })
    },
};