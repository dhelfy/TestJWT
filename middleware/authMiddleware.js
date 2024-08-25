const { key } = require('../config')
const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
    try{
        let token = req.headers.authorization.split(' ')

        if (!token) {
            res.status(403).json({message: 'User anauthorized'})
        } else {
            let decoded = jwt.verify(token[1], key)

            req.user_decoded = decoded
            next()
        }
            
    } catch (err) {
        console.log(err)
        res.status(403).json({message: 'User anauthorized'})
    }
}

module.exports = authMiddleware