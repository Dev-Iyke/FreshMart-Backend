const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  role: {type: String, default: 'User'}
}, {Timestamp: true})


const Auth = mongoose.model("Auth", authSchema)

module.exports ={Auth}