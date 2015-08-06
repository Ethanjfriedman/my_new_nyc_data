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

  //get data for and draw a pie chart

  this.getPieChartData = function (dataURL, chartParams) { //im passing in chartParams* and dataURL from the form
    console.log('running getData');
    $http.get(dataURL)
      .then(function (dataset) {
        console.log(dataset);
        controller.makePieChart( dataset, chartParams, {} ); //using chartParams here.

      });

  };

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
