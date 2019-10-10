const express = require('express')
const route = express.Router()

// Import Route
const categoriesRoute = require('./routes/categories')
const productsRoute = require('./routes/products')
const authRoute = require('./routes/auth')
const transactionRoute = require('./routes/transactions')

route.use('/categories', categoriesRoute)
route.use('/products', productsRoute)
route.use('/user', authRoute)
route.use('/transaction', transactionRoute)
module.exports = route
