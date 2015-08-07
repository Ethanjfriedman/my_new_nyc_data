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

<<<<<<< HEAD
  


  this.getPieChartData = function () {
    console.log(controller.formData.chartParams);
    $http.get(controller.formData.dataURL)
=======
  //get data for and draw a pie chart
  this.getPieChartData = function (dataURL) {
    $http.get(dataURL)
>>>>>>> 65f0262063f718242ba86565d23200d86e957be5
      .then(function (dataset) {
        controller.makePieChart( dataset, {
          yearType:'2012',
           dataType: 'firearms'
        }, {} );
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
