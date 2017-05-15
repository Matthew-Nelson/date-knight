const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  usersRoutes = require('./routes/users.js'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  methodOverride = require('method-override'),
  mongoDB = ('mongodb://localhost/date-knight'),
  PORT = 3000

mongoose.connect(mongoDB, (err) => {
  console.log( err || "Connected to mongo DB!")
})

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(ejsLayouts)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded()) //


app.get('/', (req, res) => {
  res.send('<h1>DATE KNIGHT!</h1>')
})

app.use('/users', usersRoutes)


app.listen(PORT, (err) => {
  console.log( err || "Server running on port", PORT )
})
