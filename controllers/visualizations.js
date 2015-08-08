var express = require('express'),
    router = express.Router(),
    models = require('../models/schemas.js'),
    User = models.user,
    url = require('url'),
    https = require('https'),
    session = require('express-session'),
    Visualization = models.visualization;

module.exports = router;

/*<><><><><><><><><><><><><><><><><><><><><><><><><>*/

router.post('/', function (req, res) {
    console.log('POST to /visualizations -- now off to get the data');
    var dataSent = req.body;
    console.log(dataSent);
    Visualization.findOne({dataURL: dataSent.dataURL}, function (error, visualization) {
      console.log('searching in db...');
      if (error) {
        console.log("error finding visualization" + error);
      } else if (visualization == null) {
        console.log("visualization NOT found in DB");
        pullData(dataSent);
      } else {
        console.log("visualization found!!");
        var chartParams = dataSent.chartParams || null,
            svgParams = dataSent.svgParams || null;
        res.json({dataset: visualization, chartParams: chartParams, svgParams: svgParams});
      }
    });
});

pullData = function(dataWanted, vizInfo) {
  console.log("data url:", dataWanted.dataURL);

  var request = https.request(dataWanted.dataURL, function(response) {
    // console.log("statusCode: ", response.statusCode);
    // console.log("headers: ", response.headers);
    var viz = new Visualization;
    response.on('data', function(d) {
      console.log("*********************************");
      console.log(d);
      console.log("*********************************");
      process.stdout.write(d);
      viz.dataset.push(d);
      console.log("viz.dataset:");
      console.log(viz.dataset);
    });
    // console.log("new viz:");
    // console.log(viz);
    viz.dataURL = dataWanted.dataURL;
    viz.name = dataWanted.databaseName;
    viz.description = dataWanted.description;
    viz.save(function(error, chart) {
      if (error) {
        console.log("error saving viz to database");
        console.log(error);
      } else {
        console.log("new visualization successfully saved!!");
        res.json({dataset: chart.dataset}, {chartParams: chart.chartParams}, {svgParams: chart.svgParams});
      }
    })
  });


  request.end();

  request.on('error', function(e) {
    console.error(e);
  });
}


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
