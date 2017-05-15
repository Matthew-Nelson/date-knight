const
  User = require('../models/User.js')

module.exports = {

  //we will be removing this later, we wont have a users index page
  index: (req,res) => {
    User.find({}, (err, usersFromDb) => {
      if(err) return console.log(err)
      res.render('index', {users: usersFromDb})
    })
  },

  show: (req, res) => {
    User.findById(req.params.id, (err, users) => {
      if(err) return console.log(err)
      res.render('show', {users: users})
    })
  },

  new: (req, res) => {
    res.render('new')
  },

  create: (req, res) => {
    User.create(req.body, (err, user) => {
      if(err) return console.log(err)
      res.redirect('/users/' + user.id)
    })
  },

  edit: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.render('edit', {user: user})
    })
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
      if(err) return console.log(err)
      res.redirect('/users/' + user.id)
    })
  },

  destroy: (req, res) => {
    User.findByIdAndDestroy(req.params.id, (err, user) => {
      if(err) return console.log(err)
      res.redirect('/')
    })
  }
}
