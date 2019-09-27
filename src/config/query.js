const db = require('../config/db')

module.exports = {
    customQuery: async (QUERY, DATA) => {
        try {
            return await db.query(QUERY, DATA)
        }
        catch (err) {
            console.log(err)
        }
    },
    selectAll: async (TABLE) => {
        try {
            return await db.query(`SELECT * FROM ${TABLE}`)
        }
        catch (err) {
            console.log(err)
        }
    },
    selectDetail: async (TABLE, DATA) => {
        try {
            return await db.query(`SELECT * FROM ${TABLE} WHERE ?`, DATA)
        }
        catch (err) {
            console.log(err)
        }
    },
    selectCustom: async (TABLE, FIELD) => {
        try {
            return await db.query(`SELECT ${FIELD} ${TABLE}`)
        }
        catch (err) {
            console.log(err)
        }
    },
    selectCustomDetail: async (TABLE, FIELD, FILTER) => {
        try {
            return await db.query(`SELECT ${FIELD} ${TABLE} WHERE ?`, FILTER)
        }
        catch (err) {
            console.log(err)
        }
    },
    insertData: async (TABLE, DATA) => {
        try {
            return await db.query(`INSERT INTO ${TABLE} SET ?`, DATA)
        }
        catch (err) {
            console.log(err)
        }
    },
    updateData: async (TABLE, DATA, FILTER) => {
        try {
            return await db.query(`UPDATE ${TABLE} SET ? WHERE ?`, [DATA, FILTER])
        }
        catch (err) {
            console.log(err)
        }
    },
    deleteData: async (TABLE, FILTER) => {
        try {
            return await db.query(`DELETE FROM ${TABLE} WHERE ?`, FILTER)
        }
        catch (err) {
            console.log(err)
        }
    },
}