var express = require('express'),
    router = express.Router(),
    models = require('../models/schemas.js'),
    user = models.user,
    visualization = models.visualization;

    module.exports = router;

/*<><><><><><><><><><><><><><><><><><><><><><><><><>*/

router.get('/bar',function(req,res){
  res.render('graph',{type:bar});
});

router.get('/pie',function(req,res){
  res.render('graph',{type:pie});
});

router.get('/timeseries',function(req,res){
  res.render('graph',{type:timeseries});
});