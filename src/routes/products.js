const express = require('express')
const route = express.Router()

// Import Controller
const productsController = require('../controllers/products')

// Import Middleware
const authMid = require('./verifyToken')

route
    .get('/', productsController.filterProducts)
    .get('/:id', productsController.fetchSelectedData)
    .post('/', authMid.isAuth, productsController.insertData)
    .patch('/:id', authMid.isAuth, productsController.updateData)
    .delete('/:id', authMid.isAuth, productsController.deleteData)
    .patch('/transaction/:id', authMid.isAuth, productsController.updateStockProduct)

    // .get('/', productsController.fetchAllData) = GET ALL DATA BUT 1 STILL WORK
module.exports = route