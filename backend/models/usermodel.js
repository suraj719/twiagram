const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");



// const UserSchema = new mongoose.Schema( {
//     username: {
//         type:String,
//         required:[true,'must provide a valid username'],
//         trim:true,
//     },
//     email: {
//         type:String,
//         required:[true,'must provide a valid email address'],
//         trim:true,
//     },
//     password: {
//         type:String,
//         required:[true,'must enter a valid combination of letters and numbers'],
//         trim:true
//     },
// })

const UserSchema = new mongoose.Schema({
    username: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
})

module.exports = mongoose.model('users',UserSchema)