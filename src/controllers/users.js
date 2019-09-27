/* eslint-disable camelcase */
const usersModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validation = require('../config/validations')
const query = require('../config/query')

module.exports = {
  registerUser: async (req, res) => {
    const { user_name, user_password, user_cpassword, user_role } = req.body
    // Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user_password, salt)

    const data = { user_name, user_password, user_cpassword, user_role, created_at: new Date() }

    const { error } = validation.registerValidation(data)
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      })
    }
    delete data.user_cpassword
    data.user_password = hashPassword

    // Validasi username exist
    const isExist = await isExistData({ user_name })
    if (isExist.length > 0) return res.status(400).json({ status: 400, message: 'data already exist in database' })

    const resultsQuery = await usersModel.registerUser(data)
    if (resultsQuery.affectedRows > 0) {
      return res.status(201).json({
        status: 201,
        message: 'success add new user',
        data: data
      })
    }
  },
  loginUser: async (req, res) => {
    const { user_name, user_password } = req.body
    const data = { user_name, user_password }

    const { error } = validation.loginValidation(data)
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message
      })
    }

    const resultsQuery = await usersModel.loginUser({ user_name })
    if (resultsQuery.length > 0) {
      const validPassword = await bcrypt.compare(req.body.user_password, resultsQuery[0].user_password)
      console.log(validPassword)
      if (!validPassword) {
        return res.status(400).json({
          status: 400,
          message: 'password is incorrected'
        })
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: 'username or password is incorrected'
      })
    }

    // Create & Assign JWT
    const token = jwt.sign({ _id: resultsQuery[0].user_name }, process.env.SECRET_KEY)
    res.status(200).header('auth-token', token).json({
      status: 200,
      message: 'login success',
      access_token: token
    })
  }
}

const isExistData = async (FILTER) => {
  try {
    return await query.selectDetail('Users', FILTER)
  } catch (err) {
    console.log(err)
  }
}
