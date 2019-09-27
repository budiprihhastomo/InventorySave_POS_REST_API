const express = require('express')
const route = express.Router()

// Import Controller
const usersController = require('../controllers/users')

route
    .post('/register', usersController.registerUser)
    .post('/login', usersController.loginUser)

module.exports = route