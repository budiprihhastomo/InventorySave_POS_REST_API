const express = require('express')
const route = express.Router()

// Import Controller
const transactionController = require('../controllers/transactions')

route
  .get('/', transactionController.fetchAllDataHeader)
  .get('/:id', transactionController.fetchAllDataDetailHeader)
  .post('/', transactionController.paymentOrder)

module.exports = route
