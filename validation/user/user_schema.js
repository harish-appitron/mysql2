const joi = require("joi")

const SignUpSchema = joi.object({
    name: joi.string().max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
   //  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
 })


 let Loginschema =  joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

let Password_validation = joi.object({
  old_password: joi.string().required(),
  new_password: joi.string().required()
})
  module.exports =  {SignUpSchema, Loginschema, Password_validation}