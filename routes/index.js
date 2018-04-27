const express = require('express');
const path = require('path');
const controllers = require('../controllers');


let router = express.Router();


router.get('/', (req, res) => {
    res.render('pages/index')
});


function adminMiddleware(req, res, next){
    if(!req.session.user || !req.session.user.isAdmin) return res.redirect('/panel');
    next();
}

router.get('/panel', (req, res) => {
    if(!req.session.user) return res.redirect('/');
    res.render('pages/panel', {user: req.session.user});
});

router.get('/adminPanel', adminMiddleware, (req, res) => {
    controllers.getUsers()
        .then(users => res.render('pages/admin', {users}))
        .catch(err => res.status(500).send(err))
});


router.post('/users', (req, res) => {
    controllers.createUser(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err.errors[0].message))
});

router.put('/users/:id', (req, res) =>{
    controllers.updateSecureLevel(req.params.id, req.body.secureLevel)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
});

router.delete('/users/:id', (req, res) =>{
    controllers.removeUser(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
});


router.post('/login', (req, res) => {
    controllers.authenticate(req.body)
        .then((user) => {
            const {id, username, isAdmin} = user;
            req.session.user = {id, username, isAdmin};
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

//tajny = 3
//poufny  = 2
//jawny = 1

function canRead(subject, object) {
    return subject >= object;
}






module.exports = router;