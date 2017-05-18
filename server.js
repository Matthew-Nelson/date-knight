const
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').load({silent: true}),
  yelp = require('yelp-fusion'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser')
  bodyParser = require('body-parser'),
  usersRoutes = require('./routes/users.js'),
  sessionsRoutes = require('./routes/sessions.js'),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  mongoDBStore = require('connect-mongodb-session')(session),
  mongoDB = process.env.MONGO_URL || 'mongodb://localhost/date-knight',
  CinepassAPI = require('cinepass-api'),
  findango = require('findango-api'),
  clientId = process.env.YELP_CLIENT_ID,
  clientSecret = process.env.YELP_CLIENT_SECRET,
  cinepassKey = process.env.CINEPASS_KEY,
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  PORT = process.env.PORT || 3000
  // PORT = process.env.PORT || 3000

mongoose.connect(mongoDB, (err) => {
  console.log(err || "Connected to mongo DB!")
})

const store = new mongoDBStore({
  uri: mongoDB,
  collection: 'sessions'
})

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

app.use(session({
	secret: 'boomchakalaka',
	cookie: {maxAge: 60000000},
	resave: true,
	saveUninitialized: false,
	store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	app.locals.currentUser = req.user
	app.locals.isLoggedIn = !!req.user
	next()
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/random', (req, res) => {
  console.log(req.body);
    var zipCode = req.query.zipCode
    var foodType = req.query.foodType
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
        CinepassAPI.init(cinepassKey)
        CinepassAPI.getMovies({city_ids: '3526'}, (movies)=>{
          // console.log(movies[1]);
          res.json({searchResult: searchResult, movies: movies})
        })
      });
    }).catch(e => {console.log(e);});


})

app.use('/users', usersRoutes)
app.use('/', sessionsRoutes)


app.listen(PORT, (err) => {
  console.log(err || "Server running on port", PORT)
})
