const reportsModel = require('../models/reports')

module.exports = {
  fetchCountCard: async (req, res) => {
    let QUERY = ''
    switch (req.query.field) {
      case '1':
        QUERY = 'SELECT transaction_date, SUM(transaction_price) transaction_price FROM `Transaction_Header` WHERE transaction_date = CURDATE() OR transaction_date = CURDATE() - INTERVAL 1 DAY GROUP BY 1'
        break
      case '2':
        QUERY = 'SELECT transaction_date, COUNT(X1.transaction_id) total_order FROM Transaction_Detail X1 LEFT JOIN Transaction_Header X2 ON X1.transaction_id = X2.transaction_id WHERE YEARWEEK(transaction_date, 1) = YEARWEEK(CURDATE(), 1) OR YEARWEEK(transaction_date, 1) = YEARWEEK(CURDATE() - INTERVAL 1 WEEK, 1) GROUP BY 1'
        break
      case '3':
        QUERY = 'SELECT SUM(transaction_price) transaction_price FROM Transaction_Header WHERE YEAR(transaction_date) = YEAR(CURDATE())'
        break
      default:
        return false
    }
    const resultQuery = await reportsModel.fetchCountCard(QUERY)
    res.status(200).json({
      status: 200,
      resultQuery
    })
  },
  fetchRecentOrder: async (req, res) => {
    const resultQuery = await reportsModel.fetchRecentOrder()
    res.status(200).json({
      status: 200,
      resultQuery
    })
  },
  fetchRecentOrderDetail: async (req, res) => {
    const resultQuery = await reportsModel.fetchRecentOrderDetail(req.params.id)
    res.status(200).json({
      status: 200,
      resultQuery
    })
  }
}
