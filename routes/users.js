const
  express = require('express'),
  passport = require('passport'),
  usersRouter = new express.Router(),
  usersController = require('../controllers/users.js')


usersRouter.get('/', usersController.index)

usersRouter.get('/:id/favorites', usersController.favorites)

usersRouter.route('/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.destroy)

usersRouter.route('/:id/favorites')
  .get(usersController.favorites)

usersRouter.route('/:id/favorites/dinner')
  .post(usersController.dinner)

usersRouter.route('/:id/favorites/movie')
  .post(usersController.movie)

module.exports = usersRouter
