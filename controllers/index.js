const crypto = require('crypto');
const Sequelize = require('sequelize');
const {User} = require('../models');
const Op = Sequelize.Op;


module.exports = {
    /**
     *
     * @returns Promise
     * @param {string} username
     * @param {string} password
     */
    createUser ({username, password}) {
        const {salt, hash} = saltHashPassword(password);
        console.log(`Adding user ${username}`);
        return User.create({
            username,
            password: hash,
            salt
        })
    },

    /**
     *
     * @returns Promise
     * @param {string} username
     * @param {string} password
     */
    authenticate ({username, password}) {
        console.log(`Authenticating user ${username} with password: ${password}`);
        return new Promise((resolve, reject) => {
            User.findOne({where: {username}}).then(user => {
                if(user === null) return reject("Username not found");
                if(saltHashPassword(password, user.salt).hash !== user.password) return reject("Wrong password");
                resolve(user);
            }).catch(err => reject(err))
        });
    },


    getUsers(){
        console.log(`Getting all users from db`);
        return User.findAll({
            attributes: ['id', 'username', 'secureLevel'],
            where: {
                isAdmin: false
            }
        })
    },

    updateSecureLevel(id, secureLevel){
        console.log(`Updating secure level`);
        return User.update({secureLevel},{where: {id}})
    },

    removeUser(id){
        console.log(`Removing user`);
        return User.destroy({where: {id}})
    }
};

function saltHashPassword (password, salt) {
    salt = salt || randomString();
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    return {
        salt,
        hash
    }
}
function randomString () {
    return crypto.randomBytes(16).toString('hex')
}