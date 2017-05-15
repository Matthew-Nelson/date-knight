const
  mongoose = require('mongoose'),
  restuarantSchema = mongoose.Schema({
    name: String,
    rating: Number,
    phoneNumber: Number,
    cuisine: String
  }),
  movieSchema = mongoose.Schema({
    name: String,
    genre: String
  }),
  userSchema = new mongoose.Schema({
    username: String,
    email: String,
    zipCode: Number,
    movies: [movieSchema],
    restaurants: [restuarantSchema]
  })

module.exports = mongoose.model('User', userSchema)
