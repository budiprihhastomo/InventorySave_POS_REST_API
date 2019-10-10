const QUERY = require('../configs/query')
const TABLE_HEADER = 'Transaction_Header'
const TABLE_DETAIL = 'Transaction_Detail'

const CFIELD_HEADER = 'X1.transaction_id, transaction_date, transaction_price, user_name'
const CTABLE_HEADER = 'FROM Transaction_Header X1 LEFT JOIN Users X2 ON X1.user_id = X2.user_id'

const CFIELD_DETAIL = 'transaction_detail_id, X1.transaction_id, transaction_date, product_name, qty, price'
const CTABLE_DETAIL = 'FROM Transaction_Detail X1 LEFT JOIN Transaction_Header X2 ON X1.transaction_id = X2.transaction_id LEFT JOIN Products X3 ON X1.product_id = X3.product_id'
module.exports = {
  fetchAllDataHeader: async () => {
    try {
      return await QUERY.selectCustom(CTABLE_HEADER, CFIELD_HEADER)
    } catch (err) {
      console.log(err)
    }
  },
  fetchAllDataDetailHeader: async (FILTER) => {
    try {
      return await QUERY.selectCustomDetail(CTABLE_DETAIL, CFIELD_DETAIL, FILTER)
    } catch (err) {
      console.log(err)
    }
  },
  paymentOrderHeader: async (DATA) => {
    try {
      return await QUERY.insertData(TABLE_HEADER, DATA)
    } catch (err) {
      console.log(err)
    }
  },
  paymentOrderDetail: async (DATA) => {
    try {
      return await QUERY.insertDataBatch(TABLE_DETAIL, DATA)
    } catch (err) {
      console.log(err)
    }
  }
}
