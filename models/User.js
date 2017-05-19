const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')
  restuarantSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    phoneNumber: Number,
    cuisine: String,
    img: String
  }),
  movieSchema = new mongoose.Schema({
    name: String,
    genre: String,
    img: String
  }),
  userSchema = new mongoose.Schema({
    local: {
      username: String,
      email: String,
      password: String
    },
    zipCode: Number,
    profilePic: String,
    movies: [movieSchema],
    genrePreferences: [],
    restaurants: [restuarantSchema],
    cuisinePreferences: []
  })

  userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
  }

module.exports = mongoose.model('User', userSchema)
