const express = require('express')
const route = express.Router()
const redis = require('redis')
const client = redis.createClient()

// Import Controller
const categoriesController = require('../controllers/categories')

// Caching with redis
const cacheData = (req, res, next) => {
  client.get('categories', (err, data) => {
    if (err) throw err
    if (data != null) {
      return res.status(200).json({
        status: 200,
        message: 'success fetch data from database',
        data: JSON.parse(data)
      })
    } else {
      next()
    }
  })
}

route
  .get('/', cacheData, categoriesController.fetchAllData)
  .get('/:id', categoriesController.fetchSelectedData)
  .post('/', categoriesController.insertData)
  .patch('/:id', categoriesController.updateData)
  .delete('/:id', categoriesController.deleteData)

module.exports = route
