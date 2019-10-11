const transactionModel = require('../models/transactions')
const uuidv1 = require('uuid/v1')

module.exports = {
  fetchAllDataHeader: async (req, res) => {
    const resultQuery = await transactionModel.fetchAllDataHeader()
    return res.status(200).json({
      status: 200,
      message: 'success fetch data from database',
      data: resultQuery
    })
  },
  fetchAllDataDetailHeader: async (req, res) => {
    const FILTER = { 'X1.transaction_id': req.params.id }
    const resultQuery = await transactionModel.fetchAllDataDetailHeader(FILTER)
    if (resultQuery.length > 0) {
      res.status(200).json({
        status: 200,
        message: 'success fetch data from database',
        data: resultQuery
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'data not available in database'
      })
    }
  },
  paymentOrder: async (req, res) => {
    // eslint-disable-next-line camelcase
    const unique_transaction_id = uuidv1()
    // eslint-disable-next-line camelcase
    const { transaction_price, user_id, order_detail } = req.body
    const data = { transaction_id: unique_transaction_id, transaction_date: new Date(), transaction_price, user_id }
    const resultQueryHeader = await transactionModel.paymentOrderHeader(data)
    if (resultQueryHeader.affectedRows > 0) {
      // REVIEW : Testing Code Transaksi (BETA VERSION)
      // eslint-disable-next-line prefer-const
      let orderList = []
      order_detail.map(item => {
        // eslint-disable-next-line camelcase
        orderList.push([uuidv1(), unique_transaction_id, item[0], item[1], item[2]])
      })
      const resultQueryDetail = await transactionModel.paymentOrderDetail(orderList)
      if (resultQueryDetail.affectedRows > 0) {
        res.status(201).json({
          status: 201,
          error: false,
          message: 'payment successfully'
        })
      }
    } else {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'bad request from user input'
      })
    }
  }
}
