var express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    url = 'mongodb://localhost:27017/menu', //TODO: change this to process.env || local MongoDB !!!
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 3000,
    fs = require('fs');
    mongoose.connect(url);

var db = mongoose.connection;

db.on('open', function(){
  server.listen(PORT);
  server.db = db;
  console.log('Ready For Action');
  });


 /*<><><><><><><>MIDDLEWARE<><><><><><><><>*/
 //setting up views
server.set('views', './views');
server.set('view engine', 'ejs');

//using bodyParser
server.use(bodyParser.urlencoded({extended:true}));

server.use(express.static('./public'));   //location of static files
server.use(methodOverride('_method'));    //method override to enable DELETE and PATCH reqs
server.use(morgan('short'));              //activating morgan logging
server.use(expressLayouts);               //using express-ejs-layouts to render partials

var userController = require('./controllers/users.js');
server.use('/user', userController);

var visualizationController = require('./controllers/visualizations.js');
server.use('/visualization', visualizationController);


server.get('/',function(req,res){
  res.render('homepage');
});
