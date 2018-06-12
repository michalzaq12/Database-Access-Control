const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes');
const models = require('./models');


let app = express();
app.set('view engine', 'ejs');


app.use(session({
    secret: 'super secret key',
    resave: true,
    saveUninitialized: false
    //cookie: {secure: true} //secure:true -> only over https
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

// sync() will create all table if they doesn't exist in database
models.db.sync().then(()=>{
    app.listen(3000, () => {
        console.log('Express app listening on port 3000');
    });
});
