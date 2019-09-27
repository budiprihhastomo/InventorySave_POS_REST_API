// Import mysql library
const mysql = require('mysql')
// Import database config
const config = require('./config')
// Import utils library
const util = require('util')

// Create variable con
let con = mysql.createPool(config.database.mysql)

// Connect to database
con.getConnection((err, conn) => {
    if(err) throw err
    if(conn) conn.release()
    return
})

con.query = util.promisify(con.query)

module.exports = con