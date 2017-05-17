const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  yelp = require('yelp-fusion')
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  usersRoutes = require('./routes/users.js'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  methodOverride = require('method-override'),
  mongoDB = ('mongodb://localhost/date-knight'),
  CinepassAPI = require('cinepass-api'),
  findango = require('findango-api'),
  clientId = 'B8KK0dTkGvmwwQl-4EsWfA',
  clientSecret = 'C7mlUNxCQ2QsE1PmeMLJGkz5J1ITcL0rAtoEP7CjBw814U7eld6emqSmSPkVSnTp',
  PORT = 3000

mongoose.connect(mongoDB, (err) => {
  console.log(err || "Connected to mongo DB!")
})

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded()) //


app.get('/', (req, res) => {
  var zipCode = '90401'
  var foodType = 'bar'
  const searchRequest = {
    term: foodType,
    location: zipCode,
    radius: 10000,
    open_now: true
  };
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);
    client.search(searchRequest).then(response => {
      const searchResult = response.jsonBody.businesses;
      CinepassAPI.init('CcRgdWOMlbM7xoRfx4S3LKrkumTA2tip')
      CinepassAPI.getMovies({lat:34.0522, log:118.2437}, (movies)=>{
        // console.log(movies[1]);
        res.render('index', {searchResult: searchResult, movies: movies})
      })
    });
  }).catch(e => {console.log(e);});

})

app.use('/users', usersRoutes)


app.listen(PORT, (err) => {
  console.log(err || "Server running on port", PORT)
})
