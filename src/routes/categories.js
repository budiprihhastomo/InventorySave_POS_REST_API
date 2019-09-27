const express = require('express')
const route = express.Router()

// Import Controller
const categoriesController = require('../controllers/categories')

route
  .get('/', categoriesController.fetchAllData)
  .get('/:id', categoriesController.fetchSelectedData)
  .post('/', categoriesController.insertData)
  .patch('/:id', categoriesController.updateData)
  .delete('/:id', categoriesController.deleteData)

module.exports = route
