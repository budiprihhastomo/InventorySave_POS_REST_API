// Import DB
const QUERY = require('../configs/query')
const TABLE = 'Products'

const CFIELD = 'product_id, product_name, product_description, product_image, X2.category_name, product_price, product_qty, X1.created_at, X1.updated_at'
const CTABLE = 'FROM Products X1 LEFT JOIN Categories X2 ON X1.product_category = X2.category_id'

module.exports = {
  // Get all data from database
  fetchAllData: async () => {
    try {
      return await QUERY.selectCustom(CFIELD, CTABLE)
    } catch (err) {
      console.log(err)
    }
  },
  // Get detail data from database
  fetchSelectedData: async (FILTER) => {
    try {
      return await QUERY.selectCustomDetail(CTABLE, CFIELD, FILTER)
    } catch (err) {
      console.log(err)
    }
  },
  // Insert data into database
  insertData: async (DATA) => {
    try {
      return await QUERY.insertData(TABLE, DATA)
    } catch (err) {
      console.log(err)
    }
  },
  // Update data into database
  updateData: async (DATA, FILTER) => {
    try {
      return await QUERY.updateData(TABLE, DATA, FILTER)
    } catch (err) {
      console.log(err)
    }
  },
  // Delete data from database
  deleteData: async (FILTER) => {
    try {
      return await QUERY.deleteData(TABLE, FILTER)
    } catch (err) {
      console.log(err)
    }
  },
  // Search and sorting data with require database
  // Live URL : localhost:3000/api/v1/products/?field=name&sort=asc&s=a&limit=1&page=1
  filterProducts: async (keyword, field, sort, page) => {
    let resFilter
    let resSorting
    switch (field) {
      case 'name':
        resFilter = 'ORDER BY product_name'
        break
      case 'category':
        resFilter = 'ORDER BY category_name'
        break
      case 'update':
        resFilter = 'ORDER BY updated_at'
        break
      default:
        resFilter = 'ORDER BY product_id'
    }

    switch (sort) {
      case 'asc':
        resSorting = 'asc'
        break
      case 'desc':
        resSorting = 'desc'
        break
      default:
        resSorting = 'desc'
    }
    const pagination = (page) ? 'LIMIT ?, ?' : null
    const fdataQuery = (keyword) ? `%${keyword}%` : '%'
    try {
      return await QUERY.customQuery(`SELECT ${CFIELD} ${CTABLE} WHERE product_name LIKE ? ${resFilter} ${resSorting} ${pagination}`, [fdataQuery, page.offset, page.limit])
    } catch (err) {
      console.log(err)
    }
  },
  // Update stock product
  updateStockProduct: async (DATA, FILTER) => {
    try {
      return await QUERY.updateData(TABLE, DATA, FILTER)
    } catch (err) {
      console.log(err)
    }
  }
}
