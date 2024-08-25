const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const accessMiddleware = require('./middleware/accessMiddleware')

// here we listen requests on auth path. auth/registration, auth/login, etc
router.post('/registration', check('login', 'Login could not be empty').notEmpty(), check('password', 'Password must have length from 6 to 16 symbols').isLength({min:6, max:16}), controller.registration)
router.post('/login', controller.login)
router.get('/users', accessMiddleware(['admin']), controller.getUsers)

module.exports = router