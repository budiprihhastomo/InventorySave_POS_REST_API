const reportsModal = require('../models/reports')

module.exports = {
  fetchCountCard: async (req, res) => {
    let TABLE = ''
    let FIELD = ''
    switch (req.query.field) {
      case '1':
        FIELD = 'SUM(transaction_price) TRANSACTION_INCOME_TODAY'
        TABLE = 'FROM Transaction_Header WHERE transaction_date = CURRENT_DATE'
        break
      case '2':
        FIELD = 'COUNT(X1.transaction_id) TOTAL_ORDER_TODAY'
        TABLE = 'FROM Transaction_Detail X1 LEFT JOIN Transaction_Header X2 ON X1.transaction_id = X2.transaction_id WHERE YEARWEEK(transaction_date, 1) = YEARWEEK(CURDATE(), 1)'
        break
      case '3':
        FIELD = 'SUM(transaction_price) TRANSACTION_INCOME_THIS_YEAR'
        TABLE = 'FROM Transaction_Header WHERE YEAR(transaction_date) = YEAR(CURDATE())'
        break
      default :
        return false
    }
    const resultQuery = await reportsModal.fetchCountCard(FIELD, TABLE)
    res.status(200).json({
      status: 200,
      data: resultQuery
    })
  }
}
