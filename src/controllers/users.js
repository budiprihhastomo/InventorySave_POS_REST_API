/* eslint-disable camelcase */
const usersModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validation = require('../configs/validations')
const query = require('../configs/query')
const uuidv1 = require('uuid/v1')

module.exports = {
  registerUser: async (req, res) => {
    const { user_name, user_password, user_cpassword } = req.body
    // Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user_password, salt)

    const data = { user_id: uuidv1(), user_name, user_password, user_cpassword, created_at: new Date() }

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
      delete data.user_password
      return res.status(201).json({
        status: 201,
        error: false,
        message: 'Successfully added data into database!',
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
      if (!validPassword) {
        return res.status(401).json({
          status: 401,
          error: true,
          message: 'password is incorrected'
        })
      }
    } else {
      return res.status(401).json({
        status: 401,
        error: true,
        message: 'username or password is incorrected'
      })
    }

    // Create & Assign JWT
    const dataUser = {
      user_id: resultsQuery[0].user_id,
      user_name: resultsQuery[0].user_name,
      user_role: resultsQuery[0].user_role
    }
    const token = jwt.sign(dataUser, process.env.SECRET_KEY)
    res.status(200).header('auth-token', token).json({
      status: 200,
      message: 'login success',
      access_token: token,
      data: dataUser
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
