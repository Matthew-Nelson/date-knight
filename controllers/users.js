const
  User = require('../models/User.js')

module.exports = {
  show: (req, res) => {
    User.find({}, (err, users) => {
      if(err) return console.log(err)
      res.render('show', {users: users})
    })
  }
}
