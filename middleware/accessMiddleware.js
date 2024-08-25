const { key } = require('../config')
const jwt = require('jsonwebtoken')
const pg = require('pg')

function accessMiddleware(roles) {
    return function (req, res, next) {
        try {
            let token = req.headers.authorization.split(' ')

            if (!token) {
                res.status(403).json({ message: 'User anauthorized' })
            } else {
                let decoded = jwt.verify(token[1], key)
                let userAllowed = roles.includes(decoded.user_role)

                if (userAllowed == true) {
                    next()
                } else {
                    res.status(400).json({ message: 'You dont have an access' })
                }
            }

        } catch (err) {
            console.log(err)
            res.status(403).json({ message: 'User anauthorized' })
        }
    }
}

module.exports = accessMiddleware