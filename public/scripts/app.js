/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$http', function($http) {
  var controller = this;

}]);

app.controller('visualizationController', ['$http', function($http) {
  //get data for and draw a pie chart
  this.formData = {};//im passing in chartParams*  and dataURL from the form

  var controller = this;
  this.makePieChart = makePieChart;

  


  this.getPieChartData = function () {
    // console.log(controller.formData.chartParams);
    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        controller.makePieChart(dataset, controller.formData.chartParams, {} ); //using chartParams here.

      });

  };

  //get data for and draw a timeseries chart
  this.getTimeseriesData = function (dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeTimeseries(adapterForFirearmsToTimeseries(dataset), {}, {});
      });
  };

  this.getBarGraphData = function(dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeBarGraph(adapterForDistributionOfAbuseAllegationsToBarChart(dataset),{},{});
      });
  }
}]);
