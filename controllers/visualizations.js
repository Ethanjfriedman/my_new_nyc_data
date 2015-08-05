var express = require('express'),
    router = express.Router(),
    models = require('../models/schemas.js'),
    user = models.user,
    visualization = models.visualization;

module.exports = router;

/*<><><><><><><><><><><><><><><><><><><><><><><><><>*/



router.get('/bar',function(req,res){
  res.render('graph',{bar:true, piechart:false, timeseries:false, single_timeseries: false});
});

router.get('/pie',function(req,res){
  res.render('graph',{bar:false, piechart:true, timeseries:false, single_timeseries: false});
});

router.get('/timeseries',function(req,res){
  res.render('graph',{bar:false, piechart:false, timeseries:true, single_timeseries: false});
});
