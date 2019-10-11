const express = require('express')
const route = express.Router()

// Import Controller
const reportController = require('../controllers/reports')

route
  .get('/', reportController.fetchCountCard)

module.exports = route
