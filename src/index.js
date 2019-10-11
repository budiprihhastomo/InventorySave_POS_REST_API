const express = require('express')
const route = express.Router()

// Import Route
const categoriesRoute = require('./routes/categories')
const productsRoute = require('./routes/products')
const authRoute = require('./routes/auth')
const transactionRoute = require('./routes/transactions')
const reportsRoute = require('./routes/reports')

route.use('/categories', categoriesRoute)
route.use('/products', productsRoute)
route.use('/user', authRoute)
route.use('/transaction', transactionRoute)
route.use('/reports', reportsRoute)
module.exports = route
