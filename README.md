# Project documentation
This is a simple app that provides JWT Authentication API. In this app i used next node packages:
* express (node.js framework)
* nodemon (allows automatically restart server after changes in code)
* pg (to manipulate with database on postgres)
* bcrypt.js (a library that helps with passwords hashing)
* express-validator (a library that helps with validation)
* jsonwebtoken (An implementation of JWT)
## Project structure
Currently there are 6 files.
* server.js
* authRouter.js
* authController.js
* config.js
* accessMiddleware.js
* authMiddleware.js

In <strong>server.js</strong> we have basic express.js server that runs on port 5000

In <strong>authRouter.js</strong> we have 3 request handlers for auth/... path

In <strong>authController.js</strong> we have a controller class that contains the methods that say how to handle requests from <strong>authRouter.js</strong>

In <strong>config.js</strong> all we have is an object that contains a secret key for JWT, so we can import it everywhere we need

And in <strong>accessMiddleware.js</strong> and <strong>authMiddleware.js</strong> we have logic for middlewares, first lets us check if user authorized and has a required role to access some source and second lets us just check if user authorized

## Endpoints
There are three endpoints:

* auth/registration
* auth/login
* auth/users

on auth/registration you can register an account

on auth/login you can login in it and get a JWT token, it will exist for 24h

on auth/users you can do a request to get all users from database, but it requires an admin role, exept you'll get an error that says you dont have an access here