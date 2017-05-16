const
  express = require('express'),
  usersRouter = new express.Router(),
  usersController = require('../controllers/users.js')


usersRouter.route('/')
  .get(usersController.index) //we will remove this later using to test crud
  .post(usersController.create)

usersRouter.get('/new', usersController.new)
usersRouter.get('/:id/edit', usersController.edit)


usersRouter.route('/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.destroy)

usersRouter.route('/:id/favorites')
  .get(usersController.favorites)

module.exports = usersRouter
