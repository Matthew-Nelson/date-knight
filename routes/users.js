const
  express = require('express'),
  usersRouter = new express.Router(),
  usersController = require('../controllers/users.js')


usersRouter.route('/')
  .get(usersController.index)

module.exports = usersRouter
