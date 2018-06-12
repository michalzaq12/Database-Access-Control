const faker = require('faker/locale/pl');
const controllers = require('../controllers/user');
const bookController = require('../controllers/book');


let users = 50;
let books = 20;

Promise.all(createUsers(users))
    .then(() => {
        return Promise.all(createBooks(books))
    }).then(() => {
    console.log("Finish adding user to db");
    process.exit();
}).catch(console.log);




function createUsers(x) {
    let promises = [];
    for (let i = 0; i<x; i++){
        promises.push(controllers.createUser({
            username: faker.internet.userName(),
            password: faker.internet.password()
        }));
    }
    return promises;
}


function createBooks(x) {
    let promises = [];
    for (let i = 0; i<x; i++){
        promises.push(bookController.create({
            title: faker.lorem.sentence(),
            price: Math.floor((Math.random() * 100) + 1)
        }, 1));
    }
    return promises;
}