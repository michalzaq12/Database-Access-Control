const express = require('express');
const path = require('path');
const controllers = require('../controllers');


let router = express.Router();


router.get('/', (req, res) => {
    res.render('pages/index')
});

router.get('/panel', (req, res) => {
    if(!req.session.user) return res.redirect('/');
    res.render('pages/panel', {user: req.session.user});

});


router.post('/createUser', (req, res) => {
    controllers.createUser(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err.errors[0].message))
});

router.post('/login', (req, res) => {
    controllers.authenticate(req.body)
        .then((user) => {
            const {id, username} = user;
            req.session.user = {id, username};
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

//GET /books ->pobranie kolekcji
// GET /books/:id ->pobranie konretnej 
//POST /books -> insert ksiązki
// PUT /books/:id -> aktualizacja
// DELETE /books/:id ->usuniecie




module.exports = router;