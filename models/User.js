const
  mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    username: String,
    email: String,
    zipCode: Number
  })

module.exports = mongoose.model('User', userSchema)
