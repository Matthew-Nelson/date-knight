const
  mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    username: String,
    email: String,
    zipCode: Number,
    movies: [movieSchema],
    restaurants: [restuarantSchema]
  }),
  restuarantSchema = mongoose.Schema({
    name: String,
    rating: Number,
    phoneNumber: Number,
    cuisine: String
  }),
  movieSchema = mongoose.Schema({
    name: String,
    genre: String
  })

module.exports = mongoose.model('User', userSchema)
