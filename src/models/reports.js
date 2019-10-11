const QUERY = require('../configs/query')

module.exports = {
  fetchCountCard: async (FIELD, TABLE) => {
    try {
      return await QUERY.selectCustom(FIELD, TABLE)
    } catch (err) {
      console.log(err)
    }
  }
}
