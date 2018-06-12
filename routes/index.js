const express = require('express');

const userControllers = require('../controllers/user');
const bookController = require('../controllers/book');
const orderController = require('../controllers/order');

let router = express.Router();

router.get('/', (req, res) => res.render('pages/index'));

function loginMiddleware(req, res, next) {
    if(!req.session.user) return res.redirect('/');
    next();
}

function adminMiddleware(req, res, next){
    if(!req.session.user || !req.session.user.isAdmin) return res.redirect('/panel');
    next();
}

router.get('/panel', loginMiddleware, (req, res) => {
    bookController.get(req.session.user)
        .then(books => res.render('pages/panel', {user: req.session.user, books}))
        .catch(err => res.status(err.status | 500).send(err))

});

router.put('/orders', loginMiddleware, (req, res) => {
    orderController.create(req.body, req.session.user)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(err.status | 500).send(err))
});

router.get('/orders', loginMiddleware, (req, res) => {
    orderController.getAll(req.session.user)
        .then(orders => res.render('pages/orders', {orders, user: req.session.user}))
        .catch(err => res.status(err.status | 500).send(err));
});

router.get('/admin', adminMiddleware, (req, res) => {
    userControllers.getUsers()
        .then(users => res.render('pages/admin', {users}))
        .catch(err => res.status(500).send(err))
});


router.post('/users', (req, res) => {
    userControllers.createUser(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err.errors[0].message))
});

router.put('/users/:id', (req, res) =>{
    userControllers.updateSecureLevel(req.params.id, req.body.secureLevel)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
});

router.delete('/users/:id', (req, res) =>{
    userControllers.removeUser(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
});


router.post('/login', (req, res) => {
    userControllers.authenticate(req.body)
        .then(user => {
            const {id, username, isAdmin, secureLevel} = user;
            req.session.user = {id, username, isAdmin, secureLevel};
            res.sendStatus(200)
        })
        .catch(err => res.status(401).send(err))
});


router.get('/logout', function (req, res, next) {
    if (!req.session) return res.redirect('/');
    req.session.destroy(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});






module.exports = router;