
module.exports = {
    MESSAGE: {
        status: 403,
        msg: 'Rejected because of security policy'
    },
    /**
     *
     * @param user
     * @param entityModel
     * @return {boolean}
     */
    canRead(user, entityModel) {
        return user.secureLevel >= entityModel.secureLevel;
    },
    /**
     *
     * @param user
     * @param entityModel
     * @return {boolean}
     */
    canWrite(user, entityModel) {
        return user.secureLevel <= entityModel.secureLevel;
    }
};