var express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    url = 'mongodb://localhost:27017/menu',
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    port = 3000;
    mongoose.connect('mongodb://localhost/menu');
    var db = mongoose.connection;
    db.on('open', function(){
    server.listen(port);
    server.db = db;
    console.log('Ready For Action');
    });


 /*<><><><><><><>MIDDLEWARE<><><><><><><><>*/

server.use(express.static('./public'));
server.use(methodOverride('_method'));

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extended:true}));

var userController = require('./controllers/users.js');
server.use('/user', userController);

var visualizationController = require('./controllers/visualizations.js');
server.use('/visualization', visualizationController);



server.get('/',function(req,res){
  res.render('homepage');
});
