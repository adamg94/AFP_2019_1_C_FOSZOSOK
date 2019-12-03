const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../schemas/user.schema')
const UserSession = require('../schemas/userSession.schema')
const salt = 10

router.route('/').get((req, res) => {
    User
        .find()
        .then(Users => res.json(Users))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
module.exports = router