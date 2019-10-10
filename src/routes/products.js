const express = require('express')
const route = express.Router()
const redis = require('redis')
const client = redis.createClient()

// Import Controller
const productsController = require('../controllers/products')

// Import Middleware
const authMid = require('../middlewares/verifyToken')

// Caching with redis
const cacheData = (req, res, next) => {
  client.get('prdct', (err, data) => {
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
  .get('/', productsController.filterProducts)
  .get('/:id', productsController.fetchSelectedData)
  .post('/', authMid.isAuth, productsController.insertData)
  .patch('/:id', authMid.isAuth, productsController.updateData)
  .delete('/:id', authMid.isAuth, productsController.deleteData)
  .patch('/transaction/:id', authMid.isAuth, productsController.updateStockProduct)
  // .get('/', productsController.fetchAllData) = GET ALL DATA BUT 1 STILL WORK
module.exports = route
