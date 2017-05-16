const
  express = require('express'),
  passport = require('passport'),
  sessionsRouter = new express.Router()

sessionsRouter.route('/signup')
  .get((req, res) => {
    //res.render('signup', {message: req.flash('signupMessage')})
    res.render('signup')
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
  }))

sessionsRouter.get('/profile', isLoggedIn, (req, res) => { //change
  res.render('show', {user: req.user})
})

sessionsRouter.route('/login')
  .get((req, res) => {
    //res.render('login', {message: req.flash('loginMessage')})
    res.render('login')

  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }))

sessionsRouter.get('/logout', (req,res) => {
	// destroy the session, and redirect the user back to the home page
  req.logout()
  res.redirect('/')
})


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next() //if youre authenticated, go on to the next action
  res.redirect('/')
}

module.exports = sessionsRouter
