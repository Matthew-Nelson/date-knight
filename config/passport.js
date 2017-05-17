const
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
  User = require('../models/User.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if(err) return done(err)
    if(user) return done(null, false, req.flash('signupMessage', 'That email is taken'))

    var newUser = new User()
    console.log(newUser)
    console.log(req.body)
    newUser.local.email = req.body.email
    newUser.local.username = req.body.username
    newUser.zipCode = req.body.zipCode
    newUser.local.password = newUser.generateHash(req.body.password)
    newUser.save((err, newlyCreatedUser) => {
      if(err) return console.log(err)
      return done(null, newlyCreatedUser, null)
    })
  })
}))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({'local.email': email}, (err, user) => {
    if(err) return done(err)
    if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
    if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect password...'))

    return done(null, user)
  })
}))

module.exports = passport
