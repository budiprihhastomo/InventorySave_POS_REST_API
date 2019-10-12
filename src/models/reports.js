const QUERY = require('../configs/query')

module.exports = {
  fetchCountCard: async (FILTER) => {
    try {
      return await QUERY.selectCustomQuery(FILTER)
    } catch (err) {
      console.log(err)
    }
  },
  fetchRecentOrder: async () => {
    try {
      const FILTER = 'SELECT X1.transaction_id AS Invoices, X2.user_nick AS User, transaction_date, GROUP_CONCAT(X4.product_name) Orders, transaction_price FROM Transaction_Header X1 LEFT JOIN Users X2 ON X1.user_id = X2.user_id LEFT JOIN Transaction_Detail X3 ON X1.transaction_id = X3.transaction_id LEFT JOIN Products X4 ON X3.product_id = X4.product_id GROUP BY 1'
      return await QUERY.selectCustomQuery(FILTER)
    } catch (err) {
      console.log(err)
    }
  }
}
