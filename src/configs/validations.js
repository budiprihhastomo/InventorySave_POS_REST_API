const Joi = require('@hapi/joi')

module.exports = {
  loginValidation: (DATA) => {
    const scheme = Joi.object({
      user_name: Joi.string().min(5).required(),
      user_password: Joi.string().min(5).required()
    })
    return scheme.validate(DATA)
  },
  registerValidation: (DATA) => {
    const scheme = Joi.object({
      user_id: Joi.string().max(36).required(),
      user_nick: Joi.string().max(50).required(),
      user_name: Joi.string().min(6).required(),
      user_password: Joi.string().min(6).required(),
      user_cpassword: Joi.string().required().valid(Joi.ref('user_password')),
      created_at: Joi.date()
    })
    return scheme.validate(DATA)
  }
}
