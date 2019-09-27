/* eslint-disable camelcase */
// Import model
const productsModel = require('../models/products')
const path = require('path')
const uuidV1 = require('uuid/v1')
const fs = require('fs')
const query = require('../config/query')

module.exports = {
  // Get all data from database
  fetchAllData: async (req, res) => {
    const resultQuery = await productsModel.fetchAllData()
    if (resultQuery.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'success fetch data from database',
        data: resultQuery
      })
    }
  },
  // Get detail data from database
  fetchSelectedData: async (req, res) => {
    const resultQuery = await productsModel.fetchSelectedData({ product_id: req.params.id })
    if (resultQuery.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'success fetch detail data from database',
        data: resultQuery
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  },
  // Insert data into database
  insertData: async (req, res) => {
    const upload = uploadImage(req, res)
    if (upload.error === false) {
      const { product_name, product_description, product_category, product_price, product_qty } = req.body
      const data = { product_name, product_description, product_category, product_price, product_qty, product_image: upload.name, created_at: new Date() }

      const isExist = await isExistData({ product_name })
      console.log(isExist)
      if (isExist.length > 0) return res.status(400).json({ status: 400, message: 'data already exist in database' })

      const resultQuery = await productsModel.insertData(data)
      if (resultQuery.affectedRows > 0) {
        res.status(201).json({
          status: 201,
          data: data
        })
      }
    } else {
      res.status(401).json({
        status: 401,
        message: upload.message
      })
    }
  },
  // Update data into database
  updateData: async (req, res) => {
    const upload = uploadImage(req, res)
    const {
      product_name,
      product_description,
      product_category,
      product_price,
      product_qty
    } = req.body
    const data = {
      product_name,
      product_description,
      product_category,
      product_price,
      product_qty,
      product_image: upload.name,
      updated_at: new Date()
    }
    if (upload.error === false && upload.reason === 'empty') delete data.product_image

    const isExist = await productsModel.fetchSelectedData({ product_id: req.params.id })
    if (isExist.length > 0) {
      const resultQuery = await productsModel.updateData(data, { product_id: req.params.id })
      if (resultQuery.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          data: data
        })
      }

      // Remove old image after update
      fs.unlink(path.join(__dirname) + `/../../public/${isExist[0].product_image}`, (err) => {
        if (err) return console.log('file not exist in directory upload')
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  },
  // Delete data from database
  deleteData: async (req, res) => {
    const isExist = await productsModel.fetchSelectedData({ product_id: req.params.id })
    if (isExist.length > 0) {
      const resultQuery = await productsModel.deleteData({ product_id: req.params.id })
      if (resultQuery.affectedRows > 0) {
        res.status(200).json({
          status: 200,
          data: req.params.id
        })
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  },
  // Sorting product from database
  filterProducts: async (req, res) => {
    // Pagination config
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    const offset = (page - 1) * limit
    const data = { offset: offset, limit: limit }

    const resultQuery = await productsModel.filterProducts(req.query.s, req.query.field, req.query.sort, data)
    if (resultQuery.length > 0) {
      const countPage = Math.ceil(resultQuery.length / limit)
      const results = {
        totalPage: countPage,
        offsetData: offset,
        limitData: limit,
        page: page,
        content: resultQuery
      }
      res.status(200).json({
        status: 200,
        message: 'success fetch data from database',
        data: results
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  },
  // Update stock after transaction
  updateStockProduct: async (req, res) => {
    const isExist = await productsModel.fetchSelectedData(req.params.id)
    if (isExist.length > 0) {
      const actionProduct = req.body.action
      const countAddStock = (actionProduct === 'add') ? parseInt(isExist[0].product_qty) + parseInt(req.body.product_qty) : parseInt(isExist[0].product_qty) - parseInt(req.body.product_qty)
      if (validationCountStock(countAddStock)) {
        const data = { product_qty: countAddStock, updated_at: new Date() }
        const resultQuery = await productsModel.updateStockProduct(data, { product_id: req.params.id })
        if (resultQuery.affectedRows > 0) {
          res.status(200).json({
            status: 200,
            message: 'success update stock product',
            data: data
          })
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'stock is not enough to reduce'
        })
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  }
}

// Validation Count Stock (Stock must bigger than 0)
const validationCountStock = (val) => {
  return (val >= 0)
}

// Upload Image Process
const uploadImage = (req, res) => {
  try {
    if (!req.files) {
      return {
        error: false,
        reason: 'empty',
        message: 'file not uploaded',
        name: 'no_image.png'
      }
    } else {
      const mimeType = req.files.product_image.mimetype
      if (mimeType.split('/').shift() === 'image') {
        const productImage = req.files.product_image
        const pattern = uuidV1() + '.' + productImage.name.split('.').pop()
        const locationUpload = path.join(__dirname, '../../../public/' + pattern)
        productImage.mv(locationUpload)
        return {
          error: false,
          reason: 'uploaded',
          message: 'file not uploaded',
          name: pattern
        }
      } else {
        return {
          error: true,
          message: 'upload file type is prohibited'
        }
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 500,
      message: 'cannot established database server'
    })
  }
}

const isExistData = async (FILTER) => {
  try {
    return await query.selectDetail('Products', FILTER)
  } catch (err) {
    console.log(err)
  }
}
