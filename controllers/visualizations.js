var express = require('express'),
    router = express.Router(),
    models = require('../models/schemas.js'),
    user = models.user,
    visualization = models.visualization;

module.exports = router;

/*<><><><><><><><><><><><><><><><><><><><><><><><><>*/


router.get('/bar',function(req,res){
  res.render('graph',{type: 'bar'});
});

router.get('/pie',function(req,res){
//PSEUDOCODE
//is requested dataset (:id) in our mongodb? great, then get it, and in callback, run all the code below
//ELSE do a GET req to SODA API e.g. https://data.cityofnewyork.us/resource/7r8u-zrb7.json and pass result into the callback
//to run all the code below
  var dataset = '../public/oldjsontests/firearms.json';

  var svgParams = {
    width: 500,
    height: 500,
    padding: 100
  };

  var makePieChart=require('../public/scripts/piechart.js');
  console.log(makePieChart);
  res.render('graph', {dataset: dataset, piechart: makePieChart, chartParams: chartParams, svgParams: svgParams});
});

router.get('/timeseries',function(req,res){
  res.render('graph',{type: 'timeseries'});
});
