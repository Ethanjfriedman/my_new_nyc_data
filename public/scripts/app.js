/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$http', function($http) {
  var controller = this;

}]);

app.controller('visualizationController', ['$http', function($http) {
  var controller = this;
  this.makePieChart = makePieChart;


  this.formData={};

  


  this.getPieChartData = function () {
  if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
    controller.formData.chartParams.yearType = '2012';
    controller.formData.chartParams.totalPresent = false;
    controller.formData.chartParams.dataType = 'firearms';
  } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
    controller.formData.chartParams.yearType = '2009';
    controller.formData.chartParams.totalPresent = true;
    controller.formData.chartParams.dataType = 'language';
  } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
    controller.formData.chartParams.yearType = '2009';
    controller.formData.chartParams.totalPresent = true;
    controller.formData.chartParams.dataType = 'Abuse of Authority';
  } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
    controller.formData.chartParams.yearType = '2009';
    controller.formData.chartParams.totalPresent = 'weird';
    controller.formData.chartParams.dataType = 'Race of Victims';
  } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
    controller.formData.chartParams.yearType = '2009';
    controller.formData.chartParams.totalPresent = 'weird2';
    controller.formData.chartParams.dataType = 'Gender of Victims';
  } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
    controller.formData.chartParams.yearType = '2009';
    controller.formData.chartParams.totalPresent = 'weird2';
    controller.formData.chartParams.dataType = 'Gender of Officers';
  }




    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        controller.makePieChart( dataset, controller.formData.chartParams, {} );
      });
  };

  // $http.post('/visualizations', $http.get(dataURL));


  //get data for and draw a timeseries chart
  this.getTimeseriesData = function (dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeTimeseries(adapterForFirearmsToTimeseries(dataset), {}, {});
      });

  }

  this.getBarGraphData = function(dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeBarGraph(adapterForDistributionOfAbuseAllegationsToBarChart(dataset),{},{});
      });
  }
}]);
