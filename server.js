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
app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded()) //


app.get('/', (req, res) => {
  res.render('index')
})

app.use('/users', usersRoutes)


app.listen(PORT, (err) => {
  console.log( err || "Server running on port", PORT )
})
