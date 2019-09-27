const express = require('express')
const route = express.Router()

// Import Middleware
const auth = require('./routes/verifyToken')

// Import Route
const categoriesRoute = require('./routes/categories')
const productsRoute = require('./routes/products')
const authRoute = require('./routes/auth')

route.use('/categories', categoriesRoute)
route.use('/products', productsRoute)
route.use('/user', authRoute)

module.exports = route