const express = require('express')
const authRouter = require('./authRouter')
const PORT = 5000

const app = express()

app.use(express.json()) // mutate all request data into json
app.use('/auth', authRouter) // listening request on /auth

// func that starts the server
function start() {
    try {
       app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
       }) 
    } catch (error) {
        console.log(error)
    }
}

start()