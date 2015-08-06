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
  this.getPieChartData = function (chosenDataset, chartParams) {
    console.log('running getData');
    $http.get(chosenDataset)
      .then(function (dataset) {
        console.log(dataset);
        controller.makePieChart( dataset, chartParams, {} );
      });

  };

  //get data for and draw a timeseries chart
  this.getTimeseriesData = function () {
    $http.get('https://data.cityofnewyork.us/resource/7r8u-zrb7.json')
      .then(function (dataset) {
        makeTimeseries(adapterForFirearmsToTimeseries(dataset), {}, {});
      });
  }
}]);
