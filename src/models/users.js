// Import DB
const QUERY = require('../config/query')
const TABLE = 'Users'

module.exports = {
    registerUser: async (DATA) => {
        try {
            return await QUERY.insertData(TABLE, DATA)
        }
        catch (err) {
            console.log(err)
        }
    },
    loginUser: async (DATA) => {
        try {
            return await QUERY.selectDetail(TABLE, DATA)
        }
        catch (err) {
            console.log(err)
        }
    }
}