// Import DB
const QUERY = require('../config/query')
const TABLE = 'Categories'

module.exports = {
     // Get all data from database
    fetchAllData: async () => {
        try {
            return await QUERY.selectAll(TABLE)
        }
        catch (err) {
            console.log(err)
        }
    },
     // Get detail data from database
    fetchSelectedData: async (FILTER) => {
        try {
            return await QUERY.selectDetail(TABLE, FILTER)
        } 
        catch (err) {
            console.log(err)
        }
    },
     // Insert data into database
    insertData: async (DATA) => {
        try {
            return await QUERY.insertData(TABLE, DATA)
        }
        catch (err) {
            console.log(err)
        }
    },
    // Update data into database
    updateData: async (DATA, FILTER) => {
        try {
            return await QUERY.updateData(TABLE, DATA, FILTER)
        }
        catch (err) {
            console.log(err)
        }
    },
    // Delete data from database
    deleteData: async (FILTER) => {
        try {
            return await QUERY.deleteData(TABLE, FILTER)
        }
        catch (err) {
            console.log(err)
        }
    }
}
