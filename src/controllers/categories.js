// Import model
const categoriesModel = require('../models/categories')

module.exports = {
    // Get all data from database
    fetchAllData: async (req, res) => {
        const resultQuery = await categoriesModel.fetchAllData()
        if(resultQuery.length > 0) {
            res.status(200).json({
                status: 200,
                message: 'success fetch data from database',
                data: resultQuery
            })
        }
    },
    // Get detail data from database
    fetchSelectedData: async (req, res) => {
        const resultQuery = await categoriesModel.fetchSelectedData({category_id: req.params.id})
        if(resultQuery.length > 0) {
            res.status(200).json({
                status: 200,
                message: 'success fetch data from database',
                data: resultQuery
            })
        }
        else {
            res.status(404).json({
                status: 404,
                message: 'data not available in database',
            })
        }
    },
    // Insert data into database
    insertData: async (req, res) => {
        const { category_name } = req.body
        const data = { category_name, created_at: new Date() }

        const resultQuery = await categoriesModel.insertData(data)
        if(resultQuery.affectedRows > 0) {
            res.status(201).json({
                status: 201,
                data: data
            })
        }
        else {
            res.status(400).json({
                status: 400,
                message: 'bad request from user input',
            })
        }
    },
    // Update data into database
    updateData: async (req, res) => {
        const { category_name } = req.body
        const data = { category_name, updated_at: new Date() }

        const resultQuery = await categoriesModel.updateData(data, {category_id:req.params.id})
        if(resultQuery.affectedRows > 0) {
            res.status(201).json({
                status: 201,
                data: data
            })
        }
        else {
            res.status(400).json({
                status: 400,
                message: 'bad request from user input',
            })
        }
    },
    // Delete data from database
    deleteData: async (req, res) => {
        const resultQuery = await categoriesModel.deleteData({category_id:req.params.id})
        if(resultQuery.affectedRows > 0) {
            res.status(201).json({
                status: 201,
                data: req.params.id
            })
        }
        else {
            res.status(400).json({
                status: 400,
                message: 'bad request from user input',
            })
        }
    }
}