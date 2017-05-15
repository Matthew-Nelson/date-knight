const
  User = require('../models/User.js')

module.exports = {
  index: (req, res) => {
    User.find({}, (err, users) => {
      if(err) return console.log(err)
      res.render('index', {users: users})
    })
  }
}
