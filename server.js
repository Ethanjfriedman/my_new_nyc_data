var express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    session = require('express-session'),
    expressLayouts  = require('express-ejs-layouts'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/menu',
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 3000,
    bcrypt = require('bcrypt'),
    fs = require('fs');

mongoose.connect(MONGOURI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('Database error');
});

db.once('open', function(){
  server.listen(PORT);
  server.db = db;
  console.log('Ready For Action');
  });

var schemas = require('./models/schemas.js');
var User = schemas.user;
var Visualization = schemas.visualization;

 /*<><><><><><><>MIDDLEWARE<><><><><><><><>*/
 //setting up views
server.set('views', './views');
server.set('view engine', 'ejs');

//using bodyParser
server.use(bodyParser.urlencoded({extended:true})); //for use in parsing user-submitted forms
server.use(bodyParser.json()); //for use with angular and $http

server.use(express.static('./public'));   //location of static files
server.use(methodOverride('_method'));    //method override to enable DELETE and PATCH reqs
server.use(morgan('short'));              //activating morgan logging
server.use(expressLayouts);               //using express-ejs-layouts to render partials
server.use(session({                      //setting up session
  secret: "Cooldataiskewl",
  resave: true,
  saveUninitialized: false
}));

// setting the user as a res.locals variable
// server.use(function(req, res, next){
//   console.log("running res locals middleware");
//   if (req.session.userId) {
//     console.log("Houston we have a user: " + req.session.userId)
//     console.log(req.session.user);
//     res.locals.user = req.session.user;
//     console.log(res.locals);
//   } else {
//     console.log("no user boo");
//     res.locals.user = null;
//   }
//   next();
// });
//
// var userController = require('./controllers/users.js');
// server.use('/users', userController);

var visualizationController = require('./controllers/visualizations.js');
server.use('/visualizations', visualizationController);

server.get('/about', function (req, res) {
  res.render('about');
});

// server.get('/new', function (req, res) {
//   res.render('users/new');
// });
//
// server.get('/login', function (req, res) {
//   res.render('users/login');
// });

// /  THIS FUNCTION REQUIRES USER LOGIN BEFORE PROCEEDING ANYWHERE
// OTHER THAN HOME PAGE:
server.get('/', function(req, res) {
  // if (req.session.userId) {
    res.render('homepage');
  // } else {
  //   res.render('users/login');
  // }
});  
