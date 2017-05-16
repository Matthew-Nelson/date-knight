const
  passport = require('passport'),
<<<<<<< HEAD
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

  //generate cookie string by id.
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  //decode cookie into user object by id.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
  //signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    password: 'password',
    passReqToCallBack: true
  }, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => { //checking if email exist
      if(err) return done(err)
      if(user) return done(null, false, req.flash('signupMessage', 'Email is taken, use another.'))
      //if no error new user will be created.
      var newUser = new User()
      newUser.local.name = req.body.name
      newUser.local.email = req.body.email
      newUser.local.password = newUser.generateHash(req.body.password)
      newUser.save((err, newCreatedUser) => {
        if(err) return console.log(err)
        return done(null, newCreatedUser, null)
      })
    })
  }))
  //local login if auth matches true
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
  }, (req, email, password, done) => {
    User.findOne({'local-email': email}, (err, user) => {
      if(err) return done(err)  //if local login fails
      if(!user) return done(null, false, req.flash('loginMessage', 'User not found.'))
      if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Password is incorrect'))

      return done(null, user)
    })
  }))

  module.exports = passport
=======
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
>>>>>>> 9e8c03d3dd54213b5ea4fc3905ba0546bf3a1082
