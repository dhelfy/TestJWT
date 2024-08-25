const pg = require('pg')
const bcrypt = require('bcrypt')
const saltRounds = 8;
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { key } = require('./config.js')

// connection to db
const pool = new pg.Pool({
    user: 'postgres',
    password: 'adminroot',
    host: 'localhost',
    port: 5432,
    database: 'testjwt'
})

// function to generate token for users
function generateAccessToken(id, role) {
    let payload = {
        user_id: id,
        user_role: role
    }

    return jwt.sign(payload, key, { expiresIn: '24h' })
}

// controller that handles requests that authRouter listens
class authController {
    async registration(req, res) {
        try {
            let errors = validationResult(req) // getting errors from validation in authRouter
            let { login, password } = req.body // query destructuring

            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Registration error", errors })
            } else {
                pool.query('SELECT * FROM users WHERE username = $1', [login], (err, result) => {
                    if (result.rows.length > 0) {
                        res.status(400).json({ message: "This user already exists" })
                    } else {
                        let hashPassword = bcrypt.hashSync(password, saltRounds); // hashing password and save it in variable
                        pool.query('INSERT INTO "users" (username, password, role) VALUES ($1, $2, $3)', [login, hashPassword, "user"], (err, result) => {
                            // creating new user on database
                            if (err) {
                                console.error('Error executing query:', err)
                                res.status(400).json({ message: "Database error" })
                            } else (
                                res.status(200).json({ message: "You are successfully registered!" })
                            )
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            let { login, password } = req.body // query destructuring

            pool.query('SELECT * FROM users WHERE username = $1', [login], (err, result) => {
                if (err) {
                    console.log(err)
                } else if (result.rows.length == 0) {
                    res.status(400).json({ message: 'This user does not exist' })
                } else if (result) {
                    bcrypt.compare(password, result.rows[0].password, function (err, match) {
                        if (err) {
                            console.log(err)
                        } else if (!match) {
                            res.status(400).json({ message: 'Password does not match' })
                        } else if (match) {
                            let token = generateAccessToken(result.rows[0].id, result.rows[0].role)
                            res.status(200).json({ AccessToken: token })
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            pool.query('SELECT * FROM users', (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ message: err })
                } else {
                    res.status(200).json({ users: result.rows })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()