const
  express = require('express'),
  usersRouter = new express.Router(),
  usersController = require('../controllers/users.js')


usersRouter.route('/:id')
  .get(usersController.show)

module.exports = usersRouter
