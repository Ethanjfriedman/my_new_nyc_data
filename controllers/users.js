var express = require('express'),
    router = express.Router(),
    models = require('../models/schemas.js'),
    User = models.user,
    session = require('express-session');
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    Visualization = models.visualization;
    // 
    // var schemas = require('../models/schemas.js');
    // var User = schemas.user;

// render the user login page
router.get('/login', function(req, res) {
  res.render('users/login');
});

// render the user creation page
router.get('/new', function (req, res) {
  res.render('users/new');
});

//create a new user
router.post('/new', function (req, res) {
  var userData = req.body.user;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log("bcrypt error");
      console.log(err);
      res.redirect(301, 'users/new');
    } else {
      bcrypt.hash(userData.password, salt, function (err, hash) {
        userData.password = hash;
        var newUser = new User(userData);
        newUser.save(function(err, user) {
          if (err) {
            console.log("error saving new user");
            console.log(err);
            res.redirect(301, 'users/new');
          } else {
            console.log("new user is:");
            console.log(user);
            res.render('homepage', {user: user});
          }
        });
      });
    }
  });
});

//log in existing user
router.post('/', function(req, res) {
  var userData = req.body.user;
  User.findOne({name: userData.name }, function (error, user) {
    if (error) {
      console.log("error finding user in database");
      res.redirect(301, 'login');
    } else if (user == null) {
      console.log("user not found in db");
      res.redirect(301, 'users/login');
    } else {
      bcrypt.compare(userData.password, user.password, function (err, result) {
        if (result) {
          console.log(user.name + " successfully logged in");
          console.log(user);
          req.session.userId = user._id;
          res.user = user;
          res.render('homepage', {user: user});
        } else {
          console.log('password error');
          res.redirect(301, 'login');
        }
      });
    }
  });
});

//log out existing user
router.get('/logout', function (req, res) {
  if (req.session.userId) {
    console.log("logging out user");
    req.session.userId = "";
    res.redirect(301, '/');
  } else {
    console.log("no user to log out");
    res.redirect(301, '/');
  }
});

module.exports = router;
