const express = require('express')
const route = express.Router()

// Import Controller
const reportController = require('../controllers/reports')

route
  .get('/', reportController.fetchCountCard)
  .get('/recent', reportController.fetchRecentOrder)

module.exports = route
